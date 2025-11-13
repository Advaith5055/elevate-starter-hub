import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, MessageCircle, TrendingUp, Star, Search, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-accent-glow/20 to-golden/10 -z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2QjRGNEYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djZoLTZ2LTZoNnpNMjQgMjh2Nmgtdi02aDZ6TTM2IDI4djZoLTZ2LTZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6 animate-bounce-subtle">
              <div className="inline-flex items-center space-x-3 glassy-card px-6 py-3 rounded-full shadow-lg">
                <BookOpen className="w-5 h-5 text-primary animate-float" />
                <span className="text-sm font-semibold text-primary">Your Literary Universe</span>
              </div>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Find, Share, and<br />
              <span className="text-gradient animate-glow">
                Discuss Books
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover your next favorite book, connect with fellow readers, and join a vibrant community of book lovers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button
                size="lg"
                className="btn-gradient text-primary-foreground px-10 py-7 text-lg rounded-2xl shadow-elegant hover-lift group"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <BookOpen className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg rounded-2xl border-2 hover:bg-accent/30 hover-scale glassy-card"
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
      <section className="py-20 bg-gradient-to-b from-background via-accent-glow/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent-glow)/0.1),transparent_50%)] -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
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
                description: "Search through thousands of books and find your next read",
                gradient: "from-primary/10 to-accent/10"
              },
              {
                icon: Users,
                title: "Join Community",
                description: "Connect with readers who share your literary interests",
                gradient: "from-accent/10 to-golden/10"
              },
              {
                icon: MessageCircle,
                title: "Share Reviews",
                description: "Write reviews and discuss books with fellow enthusiasts",
                gradient: "from-golden/10 to-primary/10"
              },
              {
                icon: TrendingUp,
                title: "Track Progress",
                description: "Keep track of what you're reading and your reading goals",
                gradient: "from-accent-glow/10 to-accent/10"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card-premium p-8 rounded-3xl group cursor-pointer relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
