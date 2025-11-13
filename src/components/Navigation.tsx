import { BookOpen, Search, Users, MessageCircle, User, Plus, Store, Compass } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Store, label: "Marketplace", path: "/marketplace" },
    { icon: Search, label: "Books", path: "/books" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Compass, label: "Discover", path: "/discover" },
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glassy-nav border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2.5 group"
        >
          <div className="w-9 h-9 bg-accent/30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            BookVerse
          </span>
        </button>

        {/* Nav Items */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add Book Button */}
        <Button
          onClick={() => navigate("/add-book")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg hidden md:flex"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </Button>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`p-2 rounded-lg ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
