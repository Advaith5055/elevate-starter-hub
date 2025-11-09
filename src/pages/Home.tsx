import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, MessageCircle, TrendingUp, Star, Search, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center space-x-3 bg-accent/30 px-6 py-2 rounded-full">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Your Literary Universe</span>
              </div>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Find, Share, and<br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Discuss Books
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover your next favorite book, connect with fellow readers, and join a vibrant community of book lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover-lift"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <BookOpen className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-accent/20"
                onClick={() => navigate("/books")}
              >
                Explore Books
                <Search className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Your complete reading companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Discover Books",
                description: "Search through thousands of books and find your next read"
              },
              {
                icon: Users,
                title: "Join Community",
                description: "Connect with readers who share your literary interests"
              },
              {
                icon: MessageCircle,
                title: "Share Reviews",
                description: "Write reviews and discuss books with fellow enthusiasts"
              },
              {
                icon: TrendingUp,
                title: "Track Progress",
                description: "Keep track of what you're reading and your reading goals"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card p-8 rounded-2xl border border-border hover-lift group cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10,000+", label: "Books", icon: BookOpen },
              { number: "5,000+", label: "Active Readers", icon: Users },
              { number: "25,000+", label: "Reviews", icon: Star }
            ].map((stat, idx) => (
              <div key={idx} className="p-8">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-10 h-10 text-accent" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card p-12 rounded-3xl border border-border shadow-xl">
            <Heart className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Start Your Reading Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of readers discovering new books, sharing insights, and building lasting connections.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-xl shadow-lg hover-lift"
              onClick={() => navigate("/auth")}
            >
              Join BookVerse
              <BookOpen className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
