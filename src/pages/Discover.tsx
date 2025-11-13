import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FollowButton } from "@/components/FollowButton";
import { Users, BookOpen, MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  books_read: number;
  reviews_written: number;
  member_since: string;
}

const Discover = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchRecommendedUsers();
  }, [user, navigate]);

  const fetchRecommendedUsers = async () => {
    if (!user) return;

    setLoading(true);

    // Get users the current user is already following
    const { data: followingData } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", user.id);

    const followingIds = followingData?.map((f) => f.following_id) || [];

    // Fetch all users except current user and those already followed
    let query = supabase
      .from("profiles")
      .select("*")
      .neq("id", user.id);

    // Exclude already followed users
    if (followingIds.length > 0) {
      query = query.not("id", "in", `(${followingIds.join(",")})`);
    }

    const { data, error } = await query
      .order("followers_count", { ascending: false })
      .order("books_read", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const UserCard = ({ user: profile }: { user: UserProfile }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar
            className="w-16 h-16 cursor-pointer"
            onClick={() => navigate(`/profile?userId=${profile.id}`)}
          >
            <AvatarImage src={profile.avatar_url || ""} />
            <AvatarFallback>
              {profile.full_name?.[0] || profile.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/profile?userId=${profile.id}`)}
              >
                <h3 className="font-semibold text-lg truncate">
                  {profile.full_name || profile.username || "Anonymous"}
                </h3>
                {profile.username && (
                  <p className="text-sm text-muted-foreground">
                    @{profile.username}
                  </p>
                )}
              </div>
              <FollowButton userId={profile.id} size="sm" />
            </div>

            {profile.bio && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {profile.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="secondary" className="gap-1">
                <Users className="w-3 h-3" />
                {profile.followers_count} followers
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <BookOpen className="w-3 h-3" />
                {profile.books_read} books
              </Badge>
              {profile.reviews_written > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {profile.reviews_written} reviews
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold">Discover Readers</h1>
          </div>
          <p className="text-muted-foreground">
            Find and follow readers with similar interests and active reading communities
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users to discover</h3>
              <p className="text-muted-foreground">
                You're following everyone! Check back later for new readers.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((profile) => (
              <UserCard key={profile.id} user={profile} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Discover;
