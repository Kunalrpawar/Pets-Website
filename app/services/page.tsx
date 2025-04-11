import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ServiceCard } from "@/components/service-card"
import { Search, MapPin, SlidersHorizontal, Star } from "lucide-react"

export default function ServicesPage() {
  // This would come from your database in a real app
  const services = [
    {
      id: 1,
      title: "Daily Dog Walking",
      description: "Professional dog walkers for your furry friend",
      price: 20,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "walking",
      featured: false,
    },
    {
      id: 2,
      title: "Group Dog Walking",
      description: "Socialization and exercise in a group setting",
      price: 15,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      category: "walking",
      featured: false,
    },
    {
      id: 3,
      title: "Premium Dog Walking",
      description: "One-on-one attention with photo updates",
      price: 30,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "walking",
      featured: true,
    },
    {
      id: 4,
      title: "Basic Grooming",
      description: "Bath, brush, and nail trimming",
      price: 40,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "grooming",
      featured: false,
    },
    {
      id: 5,
      title: "Full Service Grooming",
      description: "Complete grooming package for all breeds",
      price: 65,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "grooming",
      featured: true,
    },
    {
      id: 6,
      title: "Specialty Styling",
      description: "Custom cuts and styling for show dogs",
      price: 85,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      category: "grooming",
      featured: false,
    },
    {
      id: 7,
      title: "Home Pet Boarding",
      description: "Your pet stays in a sitter's loving home",
      price: 45,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      category: "boarding",
      featured: false,
    },
    {
      id: 8,
      title: "Luxury Pet Hotel",
      description: "Premium boarding with private suites and playtime",
      price: 75,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      category: "boarding",
      featured: true,
    },
    {
      id: 9,
      title: "Basic Training",
      description: "Essential commands and behavior training",
      price: 50,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      category: "training",
      featured: false,
    },
  ]

  return (
    <main className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Pet Care Services</h1>
          <p className="text-lg mb-8 max-w-2xl">Browse and book trusted pet care services in your area</p>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your location"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button size="lg" className="md:w-auto w-full">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Service Type */}
                  <div>
                    <h4 className="font-medium mb-3">Service Type</h4>
                    <div className="space-y-2">
                      {["Dog Walking", "Pet Grooming", "Pet Boarding", "Pet Training", "Pet Sitting"].map((service) => (
                        <div key={service} className="flex items-center">
                          <Checkbox id={service.toLowerCase().replace(" ", "-")} />
                          <label
                            htmlFor={service.toLowerCase().replace(" ", "-")}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider defaultValue={[0, 100]} max={200} step={1} />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">$0</span>
                      <span className="text-sm">$200+</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="font-medium mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox id={`rating-${rating}`} />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                          >
                            {Array.from({ length: rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ))}
                            {Array.from({ length: 5 - rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-300" />
                            ))}
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h4 className="font-medium mb-3">Availability</h4>
                    <div className="space-y-2">
                      {["Today", "Tomorrow", "This Week", "This Weekend", "Next Week"].map((time) => (
                        <div key={time} className="flex items-center">
                          <Checkbox id={time.toLowerCase().replace(" ", "-")} />
                          <label
                            htmlFor={time.toLowerCase().replace(" ", "-")}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {time}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Services</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Sort By:</span>
                  <span className="font-medium">Recommended</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="walking">Dog Walking</TabsTrigger>
                <TabsTrigger value="grooming">Pet Grooming</TabsTrigger>
                <TabsTrigger value="boarding">Pet Boarding</TabsTrigger>
                <TabsTrigger value="training">Pet Training</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description}
                      price={service.price}
                      rating={service.rating}
                      image={service.image}
                      category={service.category}
                      featured={service.featured}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="walking" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service) => service.category === "walking")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                        image={service.image}
                        category={service.category}
                        featured={service.featured}
                      />
                    ))}
                </div>
              </TabsContent>

              {/* Other tab contents would be similar */}
              <TabsContent value="grooming" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service) => service.category === "grooming")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                        image={service.image}
                        category={service.category}
                        featured={service.featured}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="boarding" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service) => service.category === "boarding")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                        image={service.image}
                        category={service.category}
                        featured={service.featured}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="training" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service) => service.category === "training")
                    .map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        rating={service.rating}
                        image={service.image}
                        category={service.category}
                        featured={service.featured}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
