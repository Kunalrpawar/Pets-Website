"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar, Check, Clock, DollarSign, Download, FileText, MapPin, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function DoctorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const doctorId = parseInt(params.id)
  
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [showPrescription, setShowPrescription] = useState(false)
  
  // Pet details form
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [petAge, setPetAge] = useState("")
  const [symptoms, setSymptoms] = useState("")
  
  // Mock data for doctors (same as in the listing page)
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
      bio: "Dr. Raj Sharma is a board-certified veterinary surgeon with over 15 years of experience in complex surgical procedures. He specializes in orthopedic and soft tissue surgeries for pets of all sizes.",
      education: "DVM from Bombay Veterinary College, MS in Veterinary Surgery",
      nextAvailable: "Today",
      availableDates: ["Today", "Tomorrow", "May 16, 2023", "May 17, 2023", "May 18, 2023"],
      availableTimes: {
        "Today": ["09:00 AM", "11:30 AM", "02:15 PM", "04:45 PM"],
        "Tomorrow": ["10:00 AM", "01:30 PM", "03:45 PM"],
        "May 16, 2023": ["09:30 AM", "12:00 PM", "02:45 PM", "05:15 PM"],
        "May 17, 2023": ["11:00 AM", "02:30 PM", "04:00 PM"],
        "May 18, 2023": ["09:15 AM", "12:45 PM", "03:30 PM"],
      }
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
      bio: "Dr. Priya Patel is a compassionate veterinarian dedicated to providing comprehensive care for dogs, cats, and small pets. She emphasizes preventative medicine and nutrition counseling.",
      education: "BVSc from Rajiv Gandhi Institute of Veterinary Education and Research",
      nextAvailable: "Tomorrow",
      availableDates: ["Tomorrow", "May 16, 2023", "May 17, 2023", "May 19, 2023"],
      availableTimes: {
        "Tomorrow": ["10:00 AM", "01:30 PM", "03:45 PM", "05:30 PM"],
        "May 16, 2023": ["09:30 AM", "11:45 AM", "02:00 PM", "04:30 PM"],
        "May 17, 2023": ["10:15 AM", "01:00 PM", "03:30 PM"],
        "May 19, 2023": ["09:45 AM", "12:30 PM", "03:15 PM", "05:00 PM"],
      }
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
      bio: "Dr. Ananya Desai is a veterinary dermatologist specializing in skin conditions, allergies, and ear diseases in pets. She uses advanced diagnostic techniques to identify and treat complex dermatological issues.",
      education: "MVSc in Veterinary Dermatology, BVSc from Karnataka Veterinary College",
      nextAvailable: "May 16, 2023",
      availableDates: ["May 16, 2023", "May 17, 2023", "May 19, 2023", "May 20, 2023"],
      availableTimes: {
        "May 16, 2023": ["11:00 AM", "02:00 PM", "04:30 PM"],
        "May 17, 2023": ["10:30 AM", "01:45 PM", "03:30 PM", "05:15 PM"],
        "May 19, 2023": ["09:15 AM", "12:00 PM", "02:30 PM", "04:45 PM"],
        "May 20, 2023": ["10:45 AM", "01:15 PM", "03:00 PM"],
      }
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
      bio: "Dr. Kunal Pawar is a specialist in veterinary internal medicine, focusing on diagnosing and treating diseases affecting the internal organs of pets. He has particular expertise in gastroenterology and endocrinology.",
      education: "PhD in Veterinary Sciences, DVM from Bombay Veterinary College",
      nextAvailable: "May 18, 2023",
      availableDates: ["May 18, 2023", "May 19, 2023", "May 22, 2023", "May 23, 2023"],
      availableTimes: {
        "May 18, 2023": ["09:30 AM", "12:00 PM", "03:15 PM"],
        "May 19, 2023": ["10:45 AM", "01:30 PM", "04:00 PM"],
        "May 22, 2023": ["09:00 AM", "11:45 AM", "02:30 PM", "05:00 PM"],
        "May 23, 2023": ["10:15 AM", "01:00 PM", "03:45 PM"],
      }
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
      bio: "Dr. Sahil Mehta is a veterinary cardiologist specializing in the diagnosis and treatment of heart diseases in pets. He utilizes echocardiography and other advanced cardiac imaging techniques to provide accurate diagnoses.",
      education: "Diplomate in Veterinary Cardiology, DVM from Rajiv Gandhi College of Veterinary Medicine",
      nextAvailable: "Tomorrow",
      availableDates: ["Tomorrow", "May 17, 2023", "May 19, 2023", "May 20, 2023"],
      availableTimes: {
        "Tomorrow": ["10:30 AM", "01:00 PM", "04:00 PM"],
        "May 17, 2023": ["09:45 AM", "12:15 PM", "03:30 PM", "05:30 PM"],
        "May 19, 2023": ["10:00 AM", "01:45 PM", "04:15 PM"],
        "May 20, 2023": ["09:30 AM", "12:45 PM", "03:00 PM", "05:15 PM"],
      }
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
      bio: "Dr. Sanket Verma is a veterinary neurologist with expertise in diagnosing and treating neurological disorders in pets. He specializes in seizure management, spinal cord injuries, and brain diseases.",
      education: "MVSc in Veterinary Neurology, BVSc & AH with honors from Karnataka Veterinary College",
      nextAvailable: "Today",
      availableDates: ["Today", "Tomorrow", "May 16, 2023", "May 18, 2023"],
      availableTimes: {
        "Today": ["09:15 AM", "12:45 PM", "03:30 PM", "05:45 PM"],
        "Tomorrow": ["10:30 AM", "01:15 PM", "04:00 PM"],
        "May 16, 2023": ["09:45 AM", "12:30 PM", "03:15 PM", "05:30 PM"],
        "May 18, 2023": ["11:00 AM", "02:45 PM", "04:30 PM"],
      }
    },
    {
      id: 7,
      name: "Dr. Isha Gupta",
      specialty: "Ophthalmology",
      image: "/images/c.jpeg",
      rating: 4.8,
      reviews: 89,
      location: "Shivajinagar, Pune",
      fee: 1700,
      bio: "Dr. Isha Gupta is a skilled veterinary ophthalmologist specializing in diagnosing and treating eye conditions in pets. She has expertise in treating cataracts, glaucoma, and other common eye disorders in animals.",
      education: "MVSc in Veterinary Ophthalmology, BVSc from Maharashtra Animal & Fishery Sciences University",
      nextAvailable: "Tomorrow",
      availableDates: ["Tomorrow", "May 17, 2023", "May 19, 2023", "May 21, 2023"],
      availableTimes: {
        "Tomorrow": ["10:00 AM", "12:30 PM", "03:00 PM", "05:00 PM"],
        "May 17, 2023": ["09:15 AM", "11:45 AM", "02:30 PM", "04:15 PM"],
        "May 19, 2023": ["10:30 AM", "01:00 PM", "03:30 PM"],
        "May 21, 2023": ["09:45 AM", "12:15 PM", "03:45 PM", "05:30 PM"],
      }
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
      bio: "Dr. Shubham Singh is a veterinary dentist who specializes in oral health for pets. He performs dental cleanings, extractions, and treats periodontal disease with a focus on pain management and preventative care.",
      education: "Post Graduate Diploma in Veterinary Dentistry, BVSc from Nagpur Veterinary College",
      nextAvailable: "May 17, 2023",
      availableDates: ["May 17, 2023", "May 18, 2023", "May 20, 2023", "May 22, 2023"],
      availableTimes: {
        "May 17, 2023": ["09:30 AM", "11:45 AM", "02:30 PM"],
        "May 18, 2023": ["10:15 AM", "01:30 PM", "04:00 PM"],
        "May 20, 2023": ["09:00 AM", "11:30 AM", "02:15 PM", "04:45 PM"],
        "May 22, 2023": ["10:45 AM", "01:15 PM", "03:30 PM"],
      }
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
      bio: "Dr. Aarya Joshi specializes in pet nutrition and holistic wellness. She provides customized diet plans and wellness programs, focusing on preventative care and natural solutions to enhance pet health and longevity.",
      education: "Certified Veterinary Nutritionist, BVSc from Bombay Veterinary College",
      nextAvailable: "Today",
      availableDates: ["Today", "Tomorrow", "May 16, 2023", "May 19, 2023"],
      availableTimes: {
        "Today": ["10:15 AM", "01:45 PM", "04:30 PM"],
        "Tomorrow": ["09:30 AM", "12:00 PM", "03:15 PM", "05:45 PM"],
        "May 16, 2023": ["10:45 AM", "01:30 PM", "04:00 PM"],
        "May 19, 2023": ["09:15 AM", "11:45 AM", "02:30 PM", "05:15 PM"],
      }
    },
  ]
  
  const doctor = doctors.find(doc => doc.id === doctorId)
  
  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Doctor Not Found</h1>
        <p className="mb-8 text-muted-foreground">The doctor you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push('/doctors')}>View All Doctors</Button>
      </div>
    )
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime("")
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      })
      return
    }
    
    setShowConfirmation(true)
  }

  const confirmBooking = () => {
    if (!petName || !petType || !petAge || !symptoms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the fields about your pet.",
        variant: "destructive",
      })
      return
    }
    
    // In a real app, this would send the booking data to an API
    setShowConfirmation(false)
    setBookingComplete(true)
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctor.name} is confirmed for ${selectedDate} at ${selectedTime}.`,
    })
  }

  const generatePrescription = () => {
    // Simulate PDF download - in a real app, we would use jsPDF or a server API to generate a real PDF
    const fileName = `${petName}_prescription_${new Date().toISOString().split('T')[0]}.txt`
    
    // Create a simple text blob with prescription information
    const prescriptionText = `
PetPals Veterinary Prescription
===============================

Doctor: ${doctor.name}
Specialty: ${doctor.specialty}
Location: ${doctor.location}
Appointment: ${selectedDate} at ${selectedTime}

Patient Information:
-------------------
Pet Name: ${petName}
Type: ${petType}
Age: ${petAge}

Reported Symptoms:
-----------------
${symptoms}

Prescription:
------------
1. PetAmox 500mg - Take 1 tablet twice daily for 7 days
2. VitaPet Supplement - 1 scoop daily with food
3. PetCalm Solution - Apply as needed for anxiety

Special Instructions:
-------------------
Ensure pet gets plenty of rest and water. Return for follow-up in 10 days.
Contact immediately if symptoms worsen or new symptoms develop.

Signature: Dr. ${doctor.name.split(" ")[1]}

PetPals Veterinary Services | www.petpals.com | +91 98765 43210
`

    // Create a Blob with the text content
    const blob = new Blob([prescriptionText], { type: 'text/plain' })
    
    // Create a temporary download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    
    // Trigger the download and clean up
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
    
    setShowPrescription(false)
    
    toast({
      title: "Prescription Downloaded",
      description: "Your prescription has been downloaded as a text file. Open it with any text editor or Notepad.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" className="mb-6" onClick={() => router.push('/doctors')}>
        ← Back to Doctors
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Doctor Info Section */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{doctor.name}</CardTitle>
                <CardDescription className="text-center">{doctor.specialty}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">{doctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-medium">Consultation Fee</h4>
                    <p className="text-sm text-muted-foreground">₹{doctor.fee} per visit</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">About</h4>
                <p className="text-sm text-muted-foreground">{doctor.bio}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Education</h4>
                <p className="text-sm text-muted-foreground">{doctor.education}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Booking Section */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
              <CardDescription>Select your preferred date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dates" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dates">Select Date</TabsTrigger>
                  <TabsTrigger value="times" disabled={!selectedDate}>Select Time</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dates" className="py-4">
                  <RadioGroup value={selectedDate} onValueChange={handleDateSelect} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.availableDates.map((date, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={date} id={`date-${index}`} />
                        <Label htmlFor={`date-${index}`} className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-primary" />
                          {date}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
                
                <TabsContent value="times" className="py-4">
                  {selectedDate ? (
                    <div>
                      <h3 className="font-medium mb-4">Available times for {selectedDate}:</h3>
                      <RadioGroup value={selectedTime} onValueChange={handleTimeSelect} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {doctor.availableTimes[selectedDate as keyof typeof doctor.availableTimes]?.map((time, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={time} id={`time-${index}`} />
                            <Label htmlFor={`time-${index}`} className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-primary" />
                              {time}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Please select a date first</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
                className="w-full"
              >
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
          
          {bookingComplete && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-green-800">Appointment Confirmed!</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Your appointment with <span className="font-medium">{doctor.name}</span> is 
                  confirmed for <span className="font-medium">{selectedDate}</span> at <span className="font-medium">{selectedTime}</span>.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <h3 className="font-medium text-lg mb-2">Appointment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pet Name:</span> {petName}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pet Type:</span> {petType}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pet Age:</span> {petAge}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fee:</span> ₹{doctor.fee}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You will receive a confirmation email with details and instructions.
                  Please arrive 10 minutes before your appointment time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => router.push('/doctors')}
                  >
                    Book Another Appointment
                  </Button>
                  <Button 
                    className="flex-1 gap-2"
                    onClick={() => setShowPrescription(true)}
                  >
                    <FileText className="h-4 w-4" />
                    Get Prescription
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogDescription>
              Please provide some information about your pet to help the doctor prepare for your visit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-name" className="text-right">
                Pet Name
              </Label>
              <Input
                id="pet-name"
                placeholder="e.g., Max"
                className="col-span-3"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-type" className="text-right">
                Pet Type
              </Label>
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Bird">Bird</SelectItem>
                  <SelectItem value="Hamster">Hamster</SelectItem>
                  <SelectItem value="Rabbit">Rabbit</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet-age" className="text-right">
                Pet Age
              </Label>
              <Input
                id="pet-age"
                placeholder="e.g., 3 years"
                className="col-span-3"
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="symptoms" className="text-right">
                Symptoms
              </Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your pet's symptoms or reason for visit"
                className="col-span-3"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Prescription Dialog */}
      <Dialog open={showPrescription} onOpenChange={setShowPrescription}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Prescription</DialogTitle>
            <DialogDescription>
              Your prescription will be generated as a text file that you can open with any text editor.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border rounded-lg p-4 bg-muted/50 mb-4">
              <h3 className="font-medium mb-2">Prescription Preview</h3>
              <p className="text-sm mb-1"><span className="font-medium">Doctor:</span> {doctor.name}</p>
              <p className="text-sm mb-1"><span className="font-medium">Pet:</span> {petName} ({petType}, {petAge})</p>
              <p className="text-sm mb-1"><span className="font-medium">Date:</span> {selectedDate}</p>
              <p className="text-sm mb-3"><span className="font-medium">Symptoms:</span> {symptoms}</p>
              
              <div className="bg-white p-3 rounded border mb-2">
                <h4 className="text-sm font-medium mb-1">Medications:</h4>
                <ul className="text-xs text-muted-foreground">
                  <li>• PetAmox 500mg - Take 1 tablet twice daily for 7 days</li>
                  <li>• VitaPet Supplement - 1 scoop daily with food</li>
                  <li>• PetCalm Solution - Apply as needed for anxiety</li>
                </ul>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Additional instructions and details will be included in the download.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={generatePrescription} 
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 