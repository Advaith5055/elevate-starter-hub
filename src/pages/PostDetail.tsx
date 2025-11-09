import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, ArrowLeft, Send } from "lucide-react";
import Navigation from "@/components/Navigation";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const post = {
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      username: "@emmareads"
    },
    book: "The Midnight Library",
    content: "Just finished this incredible journey through parallel lives. Matt Haig has created something truly special here. The way it explores regret and second chances resonates so deeply. Anyone else felt the same way?",
    likes: 234,
    timestamp: "2 hours ago",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop"
  };

  const comments = [
    {
      id: 1,
      user: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      },
      content: "Absolutely loved this book too! The concept of infinite possibilities was mind-blowing.",
      timestamp: "1 hour ago",
      likes: 12
    },
    {
      id: 2,
      user: {
        name: "Sophie Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      content: "This is now on my reading list! Thanks for the recommendation!",
      timestamp: "45 minutes ago",
      likes: 8
    }
  ];

  const handlePostComment = () => {
    if (comment.trim()) {
      // Handle comment posting
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/community")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community
        </Button>

        {/* Post */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          {/* User Info */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                <span className="text-sm text-muted-foreground">{post.user.username}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
              </div>
              <div className="text-sm text-primary mt-1">Reading: {post.book}</div>
            </div>
          </div>

          {/* Content */}
          <p className="text-foreground mb-4 leading-relaxed text-lg">{post.content}</p>

          {/* Image */}
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-96 object-cover rounded-xl mb-4"
            />
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 pt-4 border-t border-border">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group"
            >
              <Heart
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-sm font-medium">
                {post.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{comments.length}</span>
            </div>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group ml-auto">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Add Comment */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
            Add a Comment
          </h3>
          <div className="flex gap-3">
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 min-h-24 bg-background border-border rounded-xl resize-none"
            />
            <Button
              onClick={handlePostComment}
              className="h-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
            Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{comment.user.name}</h4>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-foreground mb-3">{comment.content}</p>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors text-sm">
                    <Heart className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
