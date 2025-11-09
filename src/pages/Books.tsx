import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Star, BookOpen, Heart, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";

const mockBooks = [
  {
    id: 1,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    rating: 4.5,
    genre: "Science Fiction",
    year: 1965
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    rating: 4.7,
    genre: "Dystopian",
    year: 1949
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    rating: 4.6,
    genre: "Romance",
    year: 1813
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1518734540-478beb8f0e8e?w=400&h=600&fit=crop",
    rating: 4.3,
    genre: "Classic",
    year: 1925
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop",
    rating: 4.8,
    genre: "Classic",
    year: 1960
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    rating: 4.6,
    genre: "Fantasy",
    year: 1937
  }
];

const genres = ["All", "Science Fiction", "Fantasy", "Romance", "Classic", "Dystopian", "Mystery"];

const Books = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (bookId: number) => {
    setFavorites(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            Explore Books
          </h1>
          <p className="text-muted-foreground">
            Discover your next favorite read
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-card border-border rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-xl"
              onClick={() => navigate("/add-book")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Book
            </Button>
          </div>

          {/* Genre Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedGenre === genre
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground hover:bg-accent/50 border border-border"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, idx) => (
            <div
              key={book.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover-lift group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate(`/book/${book.id}`)}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(book.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(book.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>
              
              <div className="p-6" onClick={() => navigate(`/book/${book.id}`)}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-3 py-1 bg-accent/30 text-primary rounded-full font-medium">
                    {book.genre}
                  </span>
                  <span className="text-xs text-muted-foreground">{book.year}</span>
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-muted-foreground mb-3">{book.author}</p>
                
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-foreground">{book.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              No books found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
