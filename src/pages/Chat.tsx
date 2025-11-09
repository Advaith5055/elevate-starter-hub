import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your BookVerse assistant. I can help you discover new books, find recommendations, and answer questions about literature. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "That's a great question! Let me help you with that. Based on your interests, I'd recommend checking out our curated collections in the Books section.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            BookVerse Assistant
          </h1>
          <p className="text-muted-foreground">
            Your AI companion for book recommendations and literary discussions
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot ? "bg-accent/30" : "bg-primary/10"
                }`}
              >
                {message.isBot ? (
                  <Bot className="w-5 h-5 text-primary" />
                ) : (
                  <User className="w-5 h-5 text-primary" />
                )}
              </div>
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.isBot
                    ? "bg-accent/10 text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Ask me anything about books..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="h-12 bg-card border-border rounded-xl flex-1"
          />
          <Button
            onClick={handleSend}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
