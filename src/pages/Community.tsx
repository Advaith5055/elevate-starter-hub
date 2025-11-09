import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, TrendingUp, Clock, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      username: "@emmareads"
    },
    book: "The Midnight Library",
    content: "Just finished this incredible journey through parallel lives. Matt Haig has created something truly special here. The way it explores regret and second chances resonates so deeply. Anyone else felt the same way?",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    user: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      username: "@alexbooks"
    },
    book: "Project Hail Mary",
    content: "Andy Weir does it again! If you loved The Martian, you NEED to read this. The science is fascinating, the humor is on point, and the friendship that develops is heartwarming. 5/5 stars!",
    likes: 189,
    comments: 32,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    user: {
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      username: "@sophiereads"
    },
    book: "The Seven Husbands of Evelyn Hugo",
    content: "This book absolutely wrecked me in the best way possible. Taylor Jenkins Reid's storytelling is phenomenal. The characters, the plot twists, everything is perfection. Grab your tissues! 😭📚",
    likes: 421,
    comments: 67,
    timestamp: "1 day ago",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop"
  }
];

const Community = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("trending");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const filters = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "popular", label: "Popular", icon: Flame }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            Community Feed
          </h1>
          <p className="text-muted-foreground">
            See what fellow readers are discussing
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-accent/50 border border-border"
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {mockPosts.map((post, idx) => (
            <div
              key={post.id}
              className="bg-card border border-border rounded-2xl p-6 hover-lift cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {/* User Info */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                    <span className="text-sm text-muted-foreground">{post.user.username}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <div className="text-sm text-primary mt-1">
                    Reading: {post.book}
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

              {/* Image (if exists) */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(post.id);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group"
                >
                  <Heart
                    className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                      likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group ml-auto"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
