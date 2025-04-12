"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, MapPin, Star, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function DoctorsPage() {
  const [specialty, setSpecialty] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [availability, setAvailability] = useState("any")
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Raj Sharma",
      specialty: "Veterinary Surgeon",
      image: "/images/doc1.jpeg",
      rating: 4.9,
      reviews: 128,
      location: "Koregaon Park, Pune",
      fee: 1200,
      nextAvailable: "Today",
      availableTimes: ["09:00 AM", "11:30 AM", "02:15 PM", "04:45 PM"],
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      specialty: "General Veterinary Care",
      image: "/images/doc2.jpeg",
      rating: 4.8,
      reviews: 95,
      location: "Viman Nagar, Pune",
      fee: 800,
      nextAvailable: "Tomorrow",
      availableTimes: ["10:00 AM", "01:30 PM", "03:45 PM", "05:30 PM"],
    },
    {
      id: 3,
      name: "Dr. Ananya Desai",
      specialty: "Dermatology",
      image: "/images/doc3.jpeg",
      rating: 4.7,
      reviews: 152,
      location: "Kalyani Nagar, Pune",
      fee: 1500,
      nextAvailable: "May 16, 2023",
      availableTimes: ["11:00 AM", "02:00 PM", "04:30 PM"],
    },
    {
      id: 4,
      name: "Dr. Kunal Pawar",
      specialty: "Internal Medicine",
      image: "/images/doc4.jpeg",
      rating: 4.9,
      reviews: 84,
      location: "Kothrud, Pune",
      fee: 1800,
      nextAvailable: "May 18, 2023",
      availableTimes: ["09:30 AM", "12:00 PM", "03:15 PM"],
    },
    {
      id: 5,
      name: "Dr. Sahil Mehta",
      specialty: "Cardiology",
      image: "/images/a.jpeg",
      rating: 4.8,
      reviews: 76,
      location: "Aundh, Pune",
      fee: 2000,
      nextAvailable: "Tomorrow",
      availableTimes: ["10:30 AM", "01:00 PM", "04:00 PM"],
    },
    {
      id: 6,
      name: "Dr. Sanket Verma",
      specialty: "Neurology",
      image: "/images/e.png",
      rating: 4.9,
      reviews: 112,
      location: "Baner, Pune",
      fee: 1900,
      nextAvailable: "Today",
      availableTimes: ["09:15 AM", "12:45 PM", "03:30 PM", "05:45 PM"],
    },
    {
      id: 7,
      name: "Dr. Isha Gupta",
      specialty: "Ophthalmology",
      image: "/images/e.png",
      rating: 4.8,
      reviews: 89,
      location: "Shivajinagar, Pune",
      fee: 1700,
      nextAvailable: "Tomorrow",
      availableTimes: ["10:00 AM", "12:30 PM", "03:00 PM", "05:00 PM"],
    },
    {
      id: 8,
      name: "Dr. Shubham Singh",
      specialty: "Dentistry",
      image: "/images/b.jpeg",
      rating: 4.6,
      reviews: 65,
      location: "Hinjewadi, Pune",
      fee: 1600,
      nextAvailable: "May 17, 2023",
      availableTimes: ["09:30 AM", "11:45 AM", "02:30 PM"],
    },
    {
      id: 9,
      name: "Dr. Aarya Joshi",
      specialty: "Nutrition & Wellness",
      image: "/images/f.jpeg",
      rating: 4.7,
      reviews: 93,
      location: "Magarpatta, Pune",
      fee: 1400,
      nextAvailable: "Today",
      availableTimes: ["10:15 AM", "01:45 PM", "04:30 PM"],
    },
  ]

  // Filter doctors based on criteria
  const filteredDoctors = doctors.filter((doctor) => {
    // Filter by specialty
    if (specialty !== "all" && doctor.specialty !== specialty) {
      return false
    }
    
    // Filter by price range
    if (doctor.fee < priceRange[0] || doctor.fee > priceRange[1]) {
      return false
    }
    
    // Filter by availability
    if (availability === "today" && doctor.nextAvailable !== "Today") {
      return false
    }
    if (availability === "tomorrow" && doctor.nextAvailable !== "Tomorrow") {
      return false
    }
    
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Pet Doctors & Specialists</h1>
      <p className="text-muted-foreground mb-8">Book appointments with veterinary specialists for your pet's needs</p>
      
      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          <Button variant="ghost" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-background border rounded-lg">
            <div>
              <Label className="mb-2 block">Specialty</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="General Veterinary Care">General Care</SelectItem>
                  <SelectItem value="Veterinary Surgeon">Surgery</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="mb-2 block">Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
              <Slider
                defaultValue={[0, 2000]}
                max={2000}
                step={100}
                onValueChange={setPriceRange}
                className="mt-6"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      
      {/* Doctor Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">
                    ₹{doctor.fee}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl">{doctor.name}</CardTitle>
                <CardDescription className="mb-4">{doctor.specialty}</CardDescription>
                
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="mt-4 flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  <span className="font-medium">Next Available:</span>
                  <span className="ml-1">{doctor.nextAvailable}</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    <span className="font-medium">Available Slots:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.availableTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 border-t border-border mt-4">
                <Button className="w-full" asChild>
                  <Link href={`/doctors/${doctor.id}`}>Book Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No doctors match your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
            <Button 
              onClick={() => {
                setSpecialty("all")
                setPriceRange([0, 2000])
                setAvailability("any")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 