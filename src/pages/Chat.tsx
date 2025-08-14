import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{
    filename: string;
    chunkIndex: number;
    score: number;
  }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Dream College Path assistant. How can I help you with your college journey today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    const userMessageObj: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      // Get conversation history for context (last 6 messages)
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
         id: (Date.now() + 1).toString(),
         role: "assistant",
         content: data.response,
         timestamp: new Date(),
         sources: data.sources,
       };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navigation />
      
      <main className="flex-1 flex justify-center items-center p-4 md:p-8">
        {/* Main Chat Area */}
        <div className="w-full max-w-3xl flex flex-col bg-white overflow-hidden rounded-xl border border-gray-200 shadow-lg h-[85vh]">
          <div className="border-b border-gray-200 p-4 bg-white">
            <h1 className="text-xl font-display font-bold text-primary text-center">
              Dream College Path Assistant
            </h1>
          </div>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`rounded-lg p-4 ${message.role === "assistant" ? "bg-gray-50 border border-gray-200" : "bg-blue-50 border border-blue-200"}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        {message.role === "user" ? (
                          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary border border-primary/30 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">
                            {message.role === "user" ? "You" : "Dream College Assistant"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs font-medium text-gray-600 mb-2">Sources:</p>
                            <div className="space-y-1">
                              {message.sources.map((source, index) => (
                                <div key={index} className="text-xs text-gray-500">
                                  📄 {source.filename} (relevance: {Math.round(source.score * 100)}%)
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-primary border border-primary/30 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-2">Dream College Assistant</p>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} className="h-4" />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white mt-auto">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex items-center border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/60 focus-within:border-primary/60 bg-white">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 py-3 px-4 bg-white focus:outline-none text-sm"
                    />
                    <div className="flex items-center pr-3">
                      <Button 
                        type="submit" 
                        disabled={!input.trim() || isLoading}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 w-9 p-0 flex items-center justify-center"
                        aria-label="Send message"
                        title="Send"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Dream College Assistant is designed to help with college admissions questions and guidance.
                  </p>
                </form>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Chat;