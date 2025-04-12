"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  // Get the service ID from URL params
  const id = params.id

  // In a real app, fetch the service details from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would be fetched from your database in a real app
      const mockServices = [
        {
          id: 1,
          title: "Daily Dog Walking",
          description: "Professional dog walkers for your furry friend",
          price: 20,
          rating: 4.8,
          image: "/images/dog walking.jpeg",
          category: "walking",
          featured: false,
        },
        {
          id: 2,
          title: "Group Dog Walking",
          description: "Socialization and exercise in a group setting",
          price: 15,
          rating: 4.6,
          image: "/images/group dog.jpeg",
          category: "walking",
          featured: false,
        },
        {
          id: 3,
          title: "Premium Dog Walking",
          description: "One-on-one attention with photo updates",
          price: 30,
          rating: 4.9,
          image: "/images/gropuss.jpeg",
          category: "walking",
          featured: true,
        },
      ]

      const foundService = mockServices.find((s) => s.id.toString() === id)
      setService(foundService || {
        title: "Service Details",
        description: "This service is not available at the moment",
        price: 0,
        image: "/placeholder.svg"
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, send the booking data to your backend
    alert(`Booking confirmed for ${service?.title} on ${date ? format(date, 'PPP') : 'N/A'} at ${time}`)
    
    // Redirect to confirmation page
    window.location.href = "/dashboard"
  }

  // Get time slots (in a real app, this would be based on availability)
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM"
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading booking details...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/services" className="flex items-center text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Details */}
          <div className="lg:col-span-1">
            <Card>
              <div className="relative">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              </div>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>30-60 min</span>
                  <MapPin className="h-4 w-4 ml-4 mr-1" />
                  <span>1.2 miles away</span>
                </div>

                <div className="font-semibold text-xl">
                  ${service.price}
                  <span className="text-sm text-muted-foreground">/hour</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Book Your Appointment</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="date">Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="time">Select Time</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((timeSlot) => (
                          <Button
                            key={timeSlot}
                            type="button"
                            variant={time === timeSlot ? "default" : "outline"}
                            className="flex items-center justify-center"
                            onClick={() => setTime(timeSlot)}
                          >
                            {timeSlot}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                      <Input
                        id="specialRequests"
                        placeholder="Any special instructions for the service provider"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-6">
                    <div className="flex justify-between mb-4">
                      <span>Service Fee</span>
                      <span>Rs{service.price}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <span>Platform Fee</span>
                      <span>Rs.2.00</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(service.price + 2).toFixed(2)}</span>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={handleSubmit} 
                  className="w-full" 
                  size="lg"
                  disabled={!date || !time}
                >
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
