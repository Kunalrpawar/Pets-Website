"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { getGeminiResponse } from "@/utils/gemini"

const INITIAL_MESSAGE = {
  role: "bot",
  content: "Hello! 👋 I'm your PetPals Assistant. I can help you with pet care advice, finding pet services, and answering questions about pet health and behavior. How can I assist you today?"
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)
    setError(null)

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    
    try {
      // Simplify the prompt to just the user's message
      const response = await getGeminiResponse(userMessage);
      
      // Check if the response starts with an error message
      if (response.startsWith("Error:") || 
          response.startsWith("Authentication error:") || 
          response.startsWith("Network error:") ||
          response.startsWith("Configuration error:") ||
          response.startsWith("Sorry, I couldn't")) {
        setError(response);
        // Add a generic message as fallback
        setMessages(prev => [...prev, {
          role: "bot",
          content: "I apologize, but I'm having trouble connecting to my knowledge base. Please try again later."
        }]);
      } else {
        // Add successful response
        setMessages(prev => [...prev, {
          role: "bot",
          content: response
        }]);
      }
    } catch (error) {
      console.error('ChatBot handleSend error:', error);
      setError("Something went wrong. Please try again.");
      setMessages(prev => [...prev, {
        role: "bot",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Button */}
      <Button
        className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-[350px] h-[500px] p-4 shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <h3 className="font-semibold">PetPals Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Error message if exists */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded text-sm">
              {error}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg p-3">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleSend} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
} 