import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    pages: "",
    publisher: "",
    description: "",
    cover: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Book added successfully!");
    navigate("/books");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/books")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            Add a New Book
          </h1>
          <p className="text-muted-foreground">
            Share a book with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            {/* Book Cover */}
            <div>
              <Label htmlFor="cover" className="text-foreground font-medium mb-2 block">
                Book Cover
              </Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-1">Click to upload cover image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-foreground font-medium">
                Book Title *
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter book title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 h-12 bg-background border-border rounded-xl"
                required
              />
            </div>

            {/* Author */}
            <div>
              <Label htmlFor="author" className="text-foreground font-medium">
                Author *
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Enter author name"
                value={formData.author}
                onChange={handleChange}
                className="mt-2 h-12 bg-background border-border rounded-xl"
                required
              />
            </div>

            {/* Genre and Year */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="genre" className="text-foreground font-medium">
                  Genre *
                </Label>
                <Input
                  id="genre"
                  name="genre"
                  type="text"
                  placeholder="e.g., Science Fiction"
                  value={formData.genre}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-background border-border rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-foreground font-medium">
                  Publication Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="e.g., 2023"
                  value={formData.year}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-background border-border rounded-xl"
                />
              </div>
            </div>

            {/* Pages and Publisher */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pages" className="text-foreground font-medium">
                  Number of Pages
                </Label>
                <Input
                  id="pages"
                  name="pages"
                  type="number"
                  placeholder="e.g., 350"
                  value={formData.pages}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-background border-border rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="publisher" className="text-foreground font-medium">
                  Publisher
                </Label>
                <Input
                  id="publisher"
                  name="publisher"
                  type="text"
                  placeholder="Publisher name"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="mt-2 h-12 bg-background border-border rounded-xl"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-foreground font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a brief description of the book..."
                value={formData.description}
                onChange={handleChange}
                className="mt-2 min-h-32 bg-background border-border rounded-xl resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-medium shadow-lg hover-lift"
            >
              Add Book
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/books")}
              className="h-12 px-8 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
