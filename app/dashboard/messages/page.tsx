"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Send } from "lucide-react"

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  
  // Mock data - would come from an API in a real app
  const [conversations, setConversations] = useState([
    {
      id: 1,
      provider: {
        name: "Kunal Pawar",
        role: "Dog Walker",
        image: "/placeholder.svg?height=40&width=40",
        online: true,
      },
      messages: [
        {
          id: 1,
          sender: "provider",
          text: "Hello! I'm looking forward to walking your dog tomorrow.",
          time: "10:30 AM",
          date: "Today",
        },
        {
          id: 2,
          sender: "user",
          text: "Great! Max is excited for his walk. Please remember to bring water, it's going to be hot tomorrow.",
          time: "10:35 AM",
          date: "Today",
        },
        {
          id: 3,
          sender: "provider",
          text: "Will do! I always carry water bottles during summer walks. Is there a specific park route you'd prefer?",
          time: "10:40 AM",
          date: "Today",
        },
        {
          id: 4,
          sender: "user",
          text: "The route around the lake would be great. It has lots of shade.",
          time: "10:45 AM",
          date: "Today",
        },
        {
          id: 5,
          sender: "provider",
          text: "Perfect! I'll take the lake route. See you tomorrow at 3 PM.",
          time: "10:50 AM",
          date: "Today",
          status: "read",
        },
      ],
      unread: 0,
    },
    {
      id: 2,
      provider: {
        name: "Michael Chen",
        role: "Groomer",
        image: "/placeholder.svg?height=40&width=40",
        online: false,
      },
      messages: [
        {
          id: 1,
          sender: "provider",
          text: "Hi there! Just confirming our grooming appointment for May 15.",
          time: "Yesterday",
          date: "May 10",
        },
        {
          id: 2,
          sender: "user",
          text: "Yes, that works! Should I bring Luna's shampoo or do you have hypoallergenic options?",
          time: "Yesterday",
          date: "May 10",
        },
        {
          id: 3,
          sender: "provider",
          text: "We have several hypoallergenic options. I'll make sure to use one that's gentle for Luna's sensitive skin.",
          time: "Yesterday",
          date: "May 10",
        },
        {
          id: 4,
          sender: "provider",
          text: "Also, do you want me to trim her nails as well?",
          time: "1 hour ago",
          date: "Today",
          status: "delivered",
        },
      ],
      unread: 1,
    },
    {
      id: 3,
      provider: {
        name: "Dr. Sanket Verma",
        role: "Veterinarian",
        image: "/images/e.png",
        online: false,
      },
      messages: [
        {
          id: 1,
          sender: "provider",
          text: "Hello, I've received Max's test results. Everything looks good, but I'd like to discuss his diet during our appointment.",
          time: "2 days ago",
          date: "May 9",
        },
        {
          id: 2,
          sender: "user",
          text: "That's a relief! Yes, I've been trying a new brand of food. Looking forward to discussing it.",
          time: "2 days ago",
          date: "May 9",
        },
        {
          id: 3,
          sender: "provider",
          text: "Great! I'll prepare some recommendations based on his weight and activity level.",
          time: "2 days ago",
          date: "May 9",
          status: "read",
        },
      ],
      unread: 0,
    },
  ])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return
    
    // Create new message object
    const newMessageObj = {
      id: conversations[activeConversation].messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: "Today",
      status: "sent"
    }
    
    // Update conversations state with the new message
    const updatedConversations = [...conversations]
    updatedConversations[activeConversation].messages.push(newMessageObj)
    setConversations(updatedConversations)
    
    // Clear input
    setNewMessage("")
    
    // Simulate a response from the provider after 1 second
    setTimeout(() => {
      const responseMessage = {
        id: updatedConversations[activeConversation].messages.length + 1,
        sender: "provider",
        text: "Thanks for your message! I'll get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: "Today",
      }
      
      const responsedConversations = [...updatedConversations]
      responsedConversations[activeConversation].messages.push(responseMessage)
      setConversations(responsedConversations)
    }, 1000)
  }

  const markAsRead = (index: number) => {
    const updatedConversations = [...conversations]
    updatedConversations[index].unread = 0
    setConversations(updatedConversations)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with your service providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 overflow-hidden">
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 py-2 border-b">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(80vh-8rem)]">
                  <div className="space-y-0 divide-y">
                    {conversations.map((conversation, index) => (
                      <div
                        key={conversation.id}
                        className={`flex items-start p-4 gap-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                          index === activeConversation ? "bg-muted" : ""
                        }`}
                        onClick={() => {
                          setActiveConversation(index)
                          markAsRead(index)
                        }}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.provider.image} />
                            <AvatarFallback>{conversation.provider.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.provider.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium truncate">{conversation.provider.name}</h4>
                            <span className="text-xs text-muted-foreground">
                              {conversation.messages[conversation.messages.length - 1].time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{conversation.provider.role}</p>
                          <p className="text-sm truncate mt-1">
                            {conversation.messages[conversation.messages.length - 1].text}
                          </p>
                        </div>
                        {conversation.unread > 0 && (
                          <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-xs">
                            {conversation.unread}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(80vh-8rem)]">
                  <div className="space-y-0 divide-y">
                    {conversations
                      .filter((conv) => conv.unread > 0)
                      .map((conversation, index) => (
                        <div
                          key={conversation.id}
                          className="flex items-start p-4 gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            const originalIndex = conversations.findIndex((c) => c.id === conversation.id)
                            setActiveConversation(originalIndex)
                            markAsRead(originalIndex)
                          }}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conversation.provider.image} />
                              <AvatarFallback>{conversation.provider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.provider.online && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium truncate">{conversation.provider.name}</h4>
                              <span className="text-xs text-muted-foreground">
                                {conversation.messages[conversation.messages.length - 1].time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{conversation.provider.role}</p>
                            <p className="text-sm truncate mt-1">
                              {conversation.messages[conversation.messages.length - 1].text}
                            </p>
                          </div>
                          <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full text-primary-foreground flex items-center justify-center text-xs">
                            {conversation.unread}
                          </div>
                        </div>
                      ))}
                    {conversations.filter((conv) => conv.unread > 0).length === 0 && (
                      <div className="p-6 text-center text-muted-foreground">
                        No unread messages
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 overflow-hidden flex flex-col">
          {conversations[activeConversation] ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conversations[activeConversation].provider.image} />
                    <AvatarFallback>
                      {conversations[activeConversation].provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{conversations[activeConversation].provider.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {conversations[activeConversation].provider.role} • 
                      {conversations[activeConversation].provider.online ? " Online" : " Offline"}
                    </p>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4 h-[calc(80vh-14rem)]">
                <div className="space-y-4">
                  {conversations[activeConversation].messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">{message.time}</span>
                          {message.sender === "user" && message.status && (
                            <Check className={`h-3 w-3 ${message.status === "read" ? "text-blue-400" : "opacity-70"}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t mt-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[calc(80vh-8rem)]">
              <div className="text-center">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 