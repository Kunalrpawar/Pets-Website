"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, ImageIcon, Paperclip, MapPin, Calendar, Clock } from "lucide-react"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState("")

  // This would come from your database in a real app
  const chats = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Dog Walker",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'll be there at 3 PM tomorrow!",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Groomer",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Your appointment is confirmed for Friday",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Pet Boarder",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Do you have any dietary restrictions for Max?",
      time: "2 days ago",
      unread: 0,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "user",
      text: "Hi Sarah, I need a dog walker for tomorrow afternoon. Are you available?",
      time: "9:15 AM",
    },
    {
      id: 2,
      sender: "other",
      text: "Hello! Yes, I'm available tomorrow afternoon. What time were you thinking?",
      time: "9:20 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Great! I was thinking around 3 PM for about an hour. My dog Max is a Golden Retriever and loves to play fetch.",
      time: "9:25 AM",
    },
    {
      id: 4,
      sender: "other",
      text: "Perfect! I can do 3 PM tomorrow for an hour. I love Golden Retrievers and I'll bring a ball for fetch. What's your address?",
      time: "9:30 AM",
    },
    {
      id: 5,
      sender: "user",
      text: "123 Main Street, Apartment 4B. The building has a security desk, I'll let them know you're coming.",
      time: "9:35 AM",
    },
    {
      id: 6,
      sender: "other",
      text: "Got it! I'll be there at 3 PM tomorrow!",
      time: "10:30 AM",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this to your API
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Chat List */}
      <div className="w-full md:w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Messages</h1>
        </div>

        <div className="p-4">
          <Input placeholder="Search messages..." className="w-full" />
        </div>

        <div className="flex-1 overflow-auto">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-muted transition-colors ${selectedChat === index ? "bg-muted" : ""}`}
              onClick={() => setSelectedChat(index)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{chat.role}</p>
                  <p className="text-sm truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && <Badge className="ml-auto">{chat.unread}</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 flex-col">
        {selectedChat !== undefined ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={chats[selectedChat].avatar} />
                  <AvatarFallback>{chats[selectedChat].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{chats[selectedChat].name}</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {chats[selectedChat].online ? (
                      <>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Online
                      </>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Booking Card */}
            <div className="p-4 border-b">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Upcoming Booking</h3>
                    <p className="text-sm text-muted-foreground">Dog Walking • Tomorrow at 3:00 PM</p>
                  </div>
                  <Button size="sm">View</Button>
                </CardContent>
              </Card>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "other" && (
                    <Avatar className="mr-2 mt-1">
                      <AvatarImage src={chats[selectedChat].avatar} />
                      <AvatarFallback>{chats[selectedChat].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  className="flex-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-2">Select a conversation</h2>
              <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: No chat selected message */}
      <div className="flex-1 flex items-center justify-center md:hidden">
        <div className="text-center p-4">
          <h2 className="text-xl font-medium mb-2">Your Messages</h2>
          <p className="text-muted-foreground mb-4">Stay in touch with your pet care providers</p>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">Select a conversation to view on this screen</p>
        </div>
      </div>
    </div>
  )
}
