import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2, TrendingUp, Clock, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { FollowButton } from "@/components/FollowButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Post {
  id: string;
  book_title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  profiles: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
  post_likes: { id: string }[];
  comments: { id: string }[];
  user_has_liked: boolean;
}

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    
    let query = supabase
      .from("posts")
      .select(`
        *,
        profiles!posts_user_id_fkey(id, username, full_name, avatar_url),
        post_likes(id),
        comments(id)
      `)
      .order("created_at", { ascending: false });

    // If "following" filter, only show posts from followed users
    if (activeFilter === "following" && user) {
      const { data: follows } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user.id);
      
      const followingIds = follows?.map(f => f.following_id) || [];
      
      if (followingIds.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      query = query.in("user_id", followingIds);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Failed to load posts");
      console.error(error);
      setLoading(false);
      return;
    }

    const postsWithLikes = data.map((post) => ({
      ...post,
      user_has_liked: user
        ? post.post_likes.some((like: any) => 
            // Check if current user has liked this post
            false // We'll fetch this separately for proper checking
          )
        : false,
    }));

    // Fetch user's likes if logged in
    if (user) {
      const { data: userLikes } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user.id);

      const likedPostIds = new Set(userLikes?.map((like) => like.post_id) || []);

      postsWithLikes.forEach((post) => {
        post.user_has_liked = likedPostIds.has(post.id);
      });
    }

    setPosts(postsWithLikes as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          fetchPosts();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_likes",
        },
        () => {
          fetchPosts();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, activeFilter]);

  const toggleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!user) {
      toast.error("Please log in to like posts");
      return;
    }

    if (currentlyLiked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to unlike post");
        console.error(error);
      }
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert({ post_id: postId, user_id: user.id });

      if (error) {
        toast.error("Failed to like post");
        console.error(error);
      }
    }
  };

  const filters = [
    { id: "all", label: "All Posts", icon: TrendingUp },
    { id: "following", label: "Following", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center shadow-lg animate-scale-bounce">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gradient">
                Community Feed
              </h1>
            </div>
            <p className="text-muted-foreground text-lg ml-15">
              See what fellow readers are discussing
            </p>
          </div>
          {user && <CreatePostDialog onPostCreated={fetchPosts} />}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all shadow-md hover-scale ${
                activeFilter === filter.id
                  ? "btn-gradient text-primary-foreground"
                  : "glassy-card text-foreground hover:bg-accent/50"
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span className="font-semibold">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {activeFilter === "following" 
                  ? "No posts from users you follow yet. Follow more readers to see their posts here!" 
                  : "No posts yet. Be the first to share!"}
              </p>
              {user && activeFilter === "all" && <CreatePostDialog onPostCreated={fetchPosts} />}
            </div>
          ) : (
            posts.map((post, idx) => {
              const PostCard = () => {
                const cardAnimation = useScrollAnimation({ threshold: 0.2 });
                
                return (
                  <div
                    ref={cardAnimation.ref}
                    key={post.id}
                    className={`card-premium rounded-3xl p-6 cursor-pointer animate-fade-in-up transition-all duration-500 ${
                      cardAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
              {/* User Info */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={post.profiles.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"}
                  alt={post.profiles.full_name || "User"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">
                      {post.profiles.full_name || "Anonymous"}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      @{post.profiles.username || "user"}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="text-sm text-primary mt-1">
                    Reading: {post.book_title}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <FollowButton userId={post.profiles.id} variant="outline" size="sm" />
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

              {/* Image (if exists) */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt="Post content"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(post.id, post.user_has_liked);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group"
                >
                  <Heart
                    className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                      post.user_has_liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {post.post_likes.length}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{post.comments.length}</span>
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group ml-auto"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
                );
              };
              
              return <PostCard key={post.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
