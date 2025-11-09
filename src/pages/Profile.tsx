import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, BookOpen, Heart, MessageCircle, Star } from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("reading");

  const stats = [
    { label: "Books Read", value: "127" },
    { label: "Reviews", value: "45" },
    { label: "Followers", value: "1.2K" },
    { label: "Following", value: "328" }
  ];

  const currentlyReading = [
    {
      id: 1,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
      progress: 65
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
      progress: 32
    }
  ];

  const favoriteBooks = [
    {
      id: 1,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      rating: 5
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1518734540-478beb8f0e8e?w=200&h=300&fit=crop",
      rating: 5
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=300&fit=crop",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-accent/30"
            />

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-foreground mb-1">
                    Sarah Johnson
                  </h1>
                  <p className="text-muted-foreground">@sarahjreads</p>
                </div>
                <Button variant="outline" className="mt-4 md:mt-0">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <p className="text-foreground mb-6 max-w-2xl">
                Avid reader | Book reviewer | Coffee enthusiast ☕📚 | Currently reading fantasy and sci-fi
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-6 bg-transparent border-b border-border rounded-none h-auto p-0">
            <TabsTrigger
              value="reading"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Currently Reading
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading" className="space-y-4">
            {currentlyReading.map((book) => (
              <div
                key={book.id}
                className="bg-card border border-border rounded-xl p-6 hover-lift cursor-pointer"
              >
                <div className="flex gap-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-20 h-30 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{book.author}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{book.progress}%</span>
                      </div>
                      <div className="w-full bg-accent/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {favoriteBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover-lift cursor-pointer"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < book.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start sharing your thoughts on books you've read
              </p>
              <Button>Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
