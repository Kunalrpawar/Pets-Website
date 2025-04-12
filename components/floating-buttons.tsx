"use client"

import { Button } from "@/components/ui/button"
import { Video, MessageCircle, X, Send } from "lucide-react"
import { useState } from "react"
import { JitsiMeet } from "@/components/jitsi-meet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function FloatingButtons() {
  const [isMeetingOpen, setIsMeetingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: "Pet Pal", content: "Hi there! How can I help you with your pet today?", time: "10:30 AM" },
    { sender: "You", content: "I'm looking for a dog walker", time: "10:31 AM" },
    { sender: "Pet Pal", content: "We have several dog walkers available in your area. Would you like me to show you some options?", time: "10:32 AM" }
  ])

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: "You", content: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      setMessage("")
      
      // Simulate a response with Socket.io (this would be real-time in production)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: "Pet Pal", 
          content: "Thanks for your message! In a real implementation, this would use Socket.io for real-time chat.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }])
      }, 1000)
    }
  }

  return (
    <>
      <div className="fixed bottom-28 right-8 z-50 flex flex-col gap-4">
        {/* Chat Button */}
        <Button
          variant="default"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        {/* Meeting Button */}
        <Button
          variant="destructive"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow p-0 flex items-center justify-center"
          onClick={() => setIsMeetingOpen(true)}
        >
          <Video className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Chat with a Pet Pal</span>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-[400px]">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 p-3 bg-slate-50 rounded-md">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${msg.sender === "You" ? "text-right" : "text-left"}`}
                >
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.sender === "You" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-800"
                  }`}>
                    <p className="text-sm font-medium">{msg.sender}</p>
                    <p>{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2">
              <Input 
                placeholder="Type your message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meeting Component */}
      {isMeetingOpen && (
        <JitsiMeet onClose={() => setIsMeetingOpen(false)} />
      )}
    </>
  )
} 