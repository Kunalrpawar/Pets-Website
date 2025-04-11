import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, DollarSign, MapPin, Star, Users } from "lucide-react"

export default function DashboardPage() {
  // This would come from your database in a real app
  const upcomingBookings = [
    {
      id: 1,
      service: "Dog Walking",
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      date: "Tomorrow",
      time: "3:00 PM - 4:00 PM",
      location: "Central Park",
      status: "confirmed",
    },
    {
      id: 2,
      service: "Grooming",
      provider: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      date: "May 15, 2023",
      time: "10:00 AM - 11:30 AM",
      location: "Paws & Claws Salon",
      status: "pending",
    },
  ]

  const recentBookings = [
    {
      id: 3,
      service: "Dog Walking",
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      date: "May 5, 2023",
      time: "3:00 PM - 4:00 PM",
      location: "Central Park",
      status: "completed",
    },
    {
      id: 4,
      service: "Pet Boarding",
      provider: {
        name: "Jessica Williams",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      date: "Apr 28-30, 2023",
      time: "Full day",
      location: "Cozy Pet Hotel",
      status: "completed",
    },
  ]

  const pets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your pet care.</p>
        </div>
        <Button>Book a New Service</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">You have 3 preferred providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350</div>
            <p className="text-xs text-muted-foreground">+$120 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pet Care Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">+6h from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="recent">Recent Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.provider.image} />
                        <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{booking.service}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>{booking.provider.name}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{booking.provider.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                      <div className="flex gap-2 mt-auto">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive hover:bg-destructive/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming bookings</p>
                <Button className="mt-4">Book a Service</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          {recentBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={booking.provider.image} />
                      <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{booking.service}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>{booking.provider.name}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1">{booking.provider.rating}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          {booking.time}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                          {booking.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                      <Button size="sm">Leave Review</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* My Pets */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Pets</h2>
          <Button variant="outline" size="sm">
            Add Pet
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card key={pet.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={pet.image} />
                    <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{pet.type}</Badge>
                      <Badge variant="outline">{pet.age}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Pet Card */}
          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[180px]">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Add a New Pet</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">
                Add your pet's details for better service
              </p>
              <Button variant="outline" size="sm">
                Add Pet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
