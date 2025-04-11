import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Check, Clock, CreditCard, MapPin, MessageSquare, Star } from "lucide-react"

export default function BookingPage({ params }: { params: { id: string } }) {
  // This would come from your database in a real app
  const booking = {
    id: params.id,
    service: "Premium Dog Walking",
    description: "One-on-one attention with photo updates",
    provider: {
      id: "provider-1",
      name: "Sarah Johnson",
      role: "Dog Walker & Trainer",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 124,
      location: "Brooklyn, NY",
      verified: true,
      bio: "Professional dog walker with 5+ years of experience. Certified in pet first aid and CPR.",
    },
    pet: {
      id: "pet-1",
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      image: "/placeholder.svg?height=60&width=60",
    },
    date: "May 15, 2023",
    time: "3:00 PM - 4:00 PM",
    duration: "1 hour",
    location: "Central Park, New York",
    price: 30,
    status: "confirmed",
    paymentMethod: "Credit Card (**** 4242)",
    bookingDate: "May 10, 2023",
    notes: "Max loves to play fetch. Please bring his favorite ball.",
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Booking Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{booking.service}</h1>
              <p className="text-muted-foreground">Booking #{booking.id}</p>
            </div>
            <Badge className="text-sm" variant={booking.status === "confirmed" ? "default" : "outline"}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>Information about your upcoming service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>
                        {booking.time} ({booking.duration})
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Pet</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.pet.image} />
                        <AvatarFallback>{booking.pet.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">{booking.pet.name}</span>
                        <p className="text-sm text-muted-foreground">
                          {booking.pet.breed}, {booking.pet.age}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment</h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>{booking.paymentMethod}</span>
                    </div>
                    <p className="mt-1 font-medium">${booking.price}.00</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Booking Date</h3>
                    <p>{booking.bookingDate}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Special Notes</h3>
                    <p className="text-sm">{booking.notes}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button variant="outline" className="sm:w-auto">
                  Reschedule
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    Contact Provider
                  </Button>
                  <Button variant="destructive" className="flex-1 sm:flex-none">
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{booking.description}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>One-on-one attention</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Photo updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>GPS tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Poop bags included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Fresh water provided</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Treats (if allowed)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Provider Details */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={booking.provider.image} />
                  <AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{booking.provider.name}</h3>
                  <p className="text-muted-foreground">{booking.provider.role}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{booking.provider.rating}</span>
                    <span className="ml-1 text-muted-foreground">({booking.provider.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm">{booking.provider.bio}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Dogs</Badge>
                <Badge variant="outline">Cats</Badge>
                <Badge variant="outline">First Aid Certified</Badge>
                <Badge variant="outline">Background Checked</Badge>
              </div>

              <div className="pt-2">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Sarah
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="before">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="during">During</TabsTrigger>
                  <TabsTrigger value="after">After</TabsTrigger>
                </TabsList>
                <TabsContent value="before" className="space-y-4 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Provider will arrive 5-10 minutes early</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Have your pet ready with collar/leash</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Provider will confirm any special instructions</p>
                  </div>
                </TabsContent>
                <TabsContent value="during" className="space-y-4 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">You'll receive photo updates</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">GPS tracking available in the app</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Provider follows your specified route</p>
                  </div>
                </TabsContent>
                <TabsContent value="after" className="space-y-4 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Provider will send a summary report</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">You'll be asked to leave a review</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Payment will be processed automatically</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
