"use client"

import { useState } from "react"
import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Define types
type Provider = {
  name: string;
  image: string;
  rating: number;
}

type Pet = {
  name: string;
  type: string;
  breed: string;
}

type Booking = {
  id: string;
  serviceType: string;
  provider: Provider;
  pet: Pet;
  date: string;
  time: string;
  status: string;
  price: string;
  notes: string;
  address: string;
}

type BookingCardProps = {
  booking: Booking;
  isPast?: boolean;
  onReschedule?: () => void;
  onCancel?: () => void;
}

export default function BookingsPage() {
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [bookings, setBookings] = useState([
    {
      id: "B001",
      serviceType: "Dog Walking",
      provider: {
        name: "Kunal Pawar",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.8
      },
      pet: {
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever"
      },
      date: "2023-06-15",
      time: "3:00 PM - 4:00 PM",
      status: "upcoming",
      price: "$30",
      notes: "Please bring water, it's going to be hot.",
      address: "123 Park Avenue, New York"
    },
    {
      id: "B002",
      serviceType: "Grooming",
      provider: {
        name: "Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.9
      },
      pet: {
        name: "Luna",
        type: "Cat",
        breed: "Siamese"
      },
      date: "2023-05-15",
      time: "10:00 AM - 11:30 AM",
      status: "upcoming",
      price: "$45",
      notes: "Luna needs a hypoallergenic shampoo.",
      address: "456 Main Street, Brooklyn"
    },
    {
      id: "B003",
      serviceType: "Vet Checkup",
      provider: {
        name: "Dr. Sanket Verma",
        image: "/images/e.png",
        rating: 5.0
      },
      pet: {
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever"
      },
      date: "2023-05-01",
      time: "9:00 AM - 9:30 AM",
      status: "completed",
      price: "$75",
      notes: "Annual checkup and vaccination.",
      address: "789 Health Drive, Queens"
    },
    {
      id: "B004",
      serviceType: "Pet Sitting",
      provider: {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.7
      },
      pet: {
        name: "Bella",
        type: "Dog",
        breed: "Poodle"
      },
      date: "2023-04-10",
      time: "8:00 AM - 6:00 PM",
      status: "completed",
      price: "$120",
      notes: "Please follow the feeding schedule.",
      address: "321 Home Street, Staten Island"
    },
    {
      id: "B005",
      serviceType: "Training Session",
      provider: {
        name: "Mike Rodriguez",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.9
      },
      pet: {
        name: "Rocky",
        type: "Dog",
        breed: "German Shepherd"
      },
      date: "2023-06-20",
      time: "4:00 PM - 5:00 PM",
      status: "upcoming",
      price: "$60",
      notes: "Focus on leash training.",
      address: "555 Training Center, Bronx"
    },
    {
      id: "B006",
      serviceType: "Pet Boarding",
      provider: {
        name: "Happy Paws Boarding",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.6
      },
      pet: {
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever"
      },
      date: "2023-03-01",
      time: "8:00 AM - March 5, 6:00 PM",
      status: "cancelled",
      price: "$200",
      notes: "Cancelled due to change in travel plans.",
      address: "999 Boarding Lane, New York"
    },
  ])
  
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [newDate, setNewDate] = useState<Date>()
  const [newTime, setNewTime] = useState("")
  const [cancellationReason, setCancellationReason] = useState("")

  const filteredBookings = bookings.filter(booking => {
    // Filter by search query
    const matchesSearch = 
      booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by date if selected
    const matchesDate = !date || booking.date === format(date, 'yyyy-MM-dd')
    
    return matchesSearch && matchesDate
  })

  const upcomingBookings = filteredBookings.filter(booking => booking.status === "upcoming")
  const pastBookings = filteredBookings.filter(booking => booking.status === "completed" || booking.status === "cancelled")

  const handleReschedule = (booking: any) => {
    setSelectedBooking(booking)
    setIsRescheduleDialogOpen(true)
  }

  const handleCancel = (booking: any) => {
    setSelectedBooking(booking)
    setIsCancelDialogOpen(true)
  }

  const confirmReschedule = () => {
    if (!newDate || !newTime) {
      toast({
        title: "Error",
        description: "Please select both date and time for rescheduling.",
        variant: "destructive"
      })
      return
    }

    // Update the booking
    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking.id) {
        const formattedDate = format(newDate, 'yyyy-MM-dd')
        // Extract just the end time from the original booking
        const originalEndTime = selectedBooking.time.split(' - ')[1]
        return {
          ...booking,
          date: formattedDate,
          time: `${newTime} - ${originalEndTime}`
        }
      }
      return booking
    })

    setBookings(updatedBookings)
    setIsRescheduleDialogOpen(false)
    setNewDate(undefined)
    setNewTime("")
    
    toast({
      title: "Booking Rescheduled",
      description: `Your appointment has been rescheduled to ${format(newDate, 'MMMM d, yyyy')} at ${newTime}.`,
    })
  }

  const confirmCancel = () => {
    if (!cancellationReason) {
      toast({
        title: "Error",
        description: "Please provide a reason for cancellation.",
        variant: "destructive"
      })
      return
    }

    // Update the booking status
    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking.id) {
        return {
          ...booking,
          status: "cancelled",
          notes: cancellationReason
        }
      }
      return booking
    })

    setBookings(updatedBookings)
    setIsCancelDialogOpen(false)
    setCancellationReason("")
    
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage your service bookings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Service type</DropdownMenuItem>
              <DropdownMenuItem>Provider</DropdownMenuItem>
              <DropdownMenuItem>Pet</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onReschedule={() => handleReschedule(booking)} 
                onCancel={() => handleCancel(booking)} 
              />
            ))
          ) : (
            <div className="text-center p-10">
              <h3 className="text-lg font-medium">No upcoming bookings</h3>
              <p className="text-muted-foreground mt-1">
                When you book services, they'll appear here
              </p>
              <Button className="mt-4">Find Services</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                isPast 
              />
            ))
          ) : (
            <div className="text-center p-10">
              <h3 className="text-lg font-medium">No past bookings</h3>
              <p className="text-muted-foreground mt-1">
                Your booking history will appear here
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogDescription>
              Change the date and time for your {selectedBooking?.serviceType} appointment with {selectedBooking?.provider.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">New Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDate ? format(newDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">New Time</Label>
              <Select onValueChange={setNewTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmReschedule}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your {selectedBooking?.serviceType} appointment with {selectedBooking?.provider.name}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Cancellation</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for cancellation..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>Back</Button>
            <Button variant="destructive" onClick={confirmCancel}>Confirm Cancellation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BookingCard({ booking, isPast = false, onReschedule, onCancel }: BookingCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-xl">{booking.serviceType}</CardTitle>
            <CardDescription>Booking #{booking.id}</CardDescription>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="mb-1 font-medium">Service Details</h4>
            <div className="text-sm grid gap-1">
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span>Provider:</span>
                <div className="flex items-center gap-1">
                  <img 
                    src={booking.provider.image} 
                    alt={booking.provider.name} 
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  <span className="text-foreground">{booking.provider.name}</span>
                  <Badge variant="outline" className="font-normal h-5 px-1">
                    {booking.provider.rating}★
                  </Badge>
                </div>
              </div>
              <div className="text-muted-foreground">
                <span>Date: </span>
                <span className="text-foreground">{booking.date}</span>
              </div>
              <div className="text-muted-foreground">
                <span>Time: </span>
                <span className="text-foreground">{booking.time}</span>
              </div>
              <div className="text-muted-foreground">
                <span>Location: </span>
                <span className="text-foreground">{booking.address}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-1 font-medium">Pet Information</h4>
            <div className="text-sm grid gap-1">
              <div className="text-muted-foreground">
                <span>Pet: </span>
                <span className="text-foreground">{booking.pet.name} ({booking.pet.breed})</span>
              </div>
              <div className="text-muted-foreground">
                <span>Notes: </span>
                <span className="text-foreground">{booking.notes}</span>
              </div>
              <div className="text-muted-foreground">
                <span>Price: </span>
                <span className="text-foreground font-medium">{booking.price}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {!isPast && booking.status === "upcoming" && (
          <>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={onReschedule}>Reschedule</Button>
          </>
        )}
        {isPast && booking.status === "completed" && (
          <Button variant="outline">Leave Review</Button>
        )}
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    upcoming: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  }
  
  const statusLabels: Record<string, string> = {
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${variants[status]}`}>
      {statusLabels[status]}
    </span>
  )
} 