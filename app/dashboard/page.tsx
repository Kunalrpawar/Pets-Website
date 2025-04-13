"use client"

import Link from "next/link"
import { CalendarDays, Clock, DollarSign, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  // Mock data - would come from an API in a real app
  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      icon: CalendarDays,
      description: "Last 30 days",
      change: "+2 from last month",
      changeType: "increase"
    },
    {
      title: "Favorite Providers",
      value: "5",
      icon: Heart,
      description: "Providers you love",
      change: "+1 new favorite",
      changeType: "increase"
    },
    {
      title: "Total Spent",
      value: "₹680",
      icon: DollarSign,
      description: "Last 30 days",
      change: "- Rs.45 from last month",
      changeType: "decrease"
    },
    {
      title: "Pet Care Hours",
      value: "48",
      icon: Clock,
      description: "Last 30 days",
      change: "+8 from last month",
      changeType: "increase"
    }
  ]

  const upcomingBookings = [
    {
      id: 1,
      service: "Dog Walking",
      provider: {
        name: "Kunal Pawar",
        image: "/placeholder.svg?height=40&width=40"
      },
      pet: "Max",
      date: "Tomorrow",
      time: "3:00 PM",
      status: "confirmed"
    },
    {
      id: 2,
      service: "Grooming",
      provider: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40"
      },
      pet: "Luna",
      date: "May 20, 2023",
      time: "10:00 AM",
      status: "confirmed"
    }
  ]

  const recentBookings = [
    {
      id: 3,
      service: "Vet Checkup",
      provider: {
        name: "Dr. Sanket Verma",
        image: "/images/e.png"
      },
      pet: "Max",
      date: "April 25, 2023",
      time: "2:30 PM",
      status: "completed",
      rating: 5
    },
    {
      id: 4,
      service: "Pet Sitting",
      provider: {
        name: "Emily Johnson",
        image: "/placeholder.svg?height=40&width=40"
      },
      pet: "Luna",
      date: "April 10, 2023",
      time: "8:00 AM - 6:00 PM",
      status: "completed",
      rating: 4
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your pet care activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className={`text-xs mt-1 ${
                stat.changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your next scheduled services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={booking.provider.image} />
                    <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{booking.service}</p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For {booking.pet} • {booking.date} at {booking.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Provider: {booking.provider.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">No upcoming bookings</p>
                <Button className="mt-4" size="sm" asChild>
                  <Link href="/services">Book a Service</Link>
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/bookings">View All Bookings</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Services</CardTitle>
            <CardDescription>Services you've recently used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={booking.provider.image} />
                  <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{booking.service}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={i < booking.rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          className={`h-3 w-3 ${
                            i < booking.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For {booking.pet} • {booking.date}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Provider: {booking.provider.name}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/bookings?tab=past">View Service History</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pet Care Progress</CardTitle>
          <CardDescription>Track your pet care services over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Walks Completed</span>
                </div>
                <span className="text-sm font-medium">8/10</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">2 more to reach your monthly goal</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Vet Checkups</span>
                </div>
                <span className="text-sm font-medium">1/2</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground">Next checkup scheduled for June 15</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Grooming Sessions</span>
                </div>
                <span className="text-sm font-medium">2/3</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground">1 more session recommended this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
