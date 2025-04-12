"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ServiceCard } from "@/components/service-card"
import { Search, MapPin, SlidersHorizontal, Star, Video } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { JitsiMeet } from "@/components/jitsi-meet"

export default function ServicesPage() {
  // This would come from your database in a real app
  const services = [
    {
      id: 1,
      title: "Daily Dog Walking",
      description: "Professional dog walkers for your furry friend",
      price: 1500,
      rating: 4.8,
      image: "/images/dog walking.jpeg",
      category: "walking",
      featured: false,
    },
    {
      id: 2,
      title: "Group Dog Walking",
      description: "Socialization and exercise in a group setting",
      price: 1000,
      rating: 4.6,
      image: "/images/group dog.jpeg",
      category: "walking",
      featured: false,
    },
    {
      id: 3,
      title: "Premium Dog Walking",
      description: "One-on-one attention with photo updates",
      price: 2000,
      rating: 4.9,
      image: "/images/gropuss.jpeg",
      category: "walking",
      featured: true,
    },
    {
      id: 4,
      title: "Basic Grooming",
      description: "Bath, brush, and nail trimming",
      price: 2500,
      rating: 4.7,
      image :"/images/a.jpeg",
      category: "grooming",
      featured: false,
    },
    {
      id: 5,
      title: "Full Service Grooming",
      description: "Complete grooming package for all breeds",
      price: 3500,
      rating: 4.9,
      image :"/images/b.jpeg",
      category: "grooming",
      featured: true,
    },
    {
      id: 6,
      title: "Specialty Styling",
      description: "Custom cuts and styling for show dogs",
      price: 4500,
      rating: 4.8,
      image :"/images/d.jpeg",
      category: "grooming",
      featured: false,
    },
    {
      id: 7,
      title: "Home Pet Boarding",
      description: "Your pet stays in a sitter's loving home",
      price: 3000,
      rating: 4.7,
      image :"/images/e.png",
      category: "boarding",
      featured: false,
    },
    {
      id: 8,
      title: "Luxury Pet Hotel",
      description: "Premium boarding with private suites and playtime",
      price: 5000,
      rating: 4.9,
      image :"/images/f.jpeg",
      category: "boarding",
      featured: true,
    },
    {
      id: 9,
      title: "Basic Training",
      description: "Essential commands and behavior training",
      price: 3500,
      rating: 4.6,
      image :"/images/g.jpeg",
      category: "training",
      featured: false,
    },
  ]

  // State for search and filters
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || "");
  const [locationQuery, setLocationQuery] = useState(searchParams?.get('loc') || "");
  const [activeTab, setActiveTab] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [filteredServices, setFilteredServices] = useState(services);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false)

  // Apply filters
  useEffect(() => {
    let results = services;
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category/tab
    if (activeTab !== 'all') {
      results = results.filter(service => service.category === activeTab);
    }
    
    // Filter by price range
    results = results.filter(service => 
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Filter by rating
    if (selectedRatings.length > 0) {
      results = results.filter(service => 
        selectedRatings.some(rating => service.rating >= rating)
      );
    }
    
    // Filter by service type
    if (selectedServiceTypes.length > 0) {
      const categoryMap: Record<string, string> = {
        "dog-walking": "walking",
        "pet-grooming": "grooming",
        "pet-boarding": "boarding",
        "pet-training": "training",
      };
      
      results = results.filter(service => 
        selectedServiceTypes.some(type => categoryMap[type] === service.category)
      );
    }
    
    setFilteredServices(results);
  }, [searchQuery, activeTab, priceRange, selectedRatings, selectedServiceTypes]);

  // Handle search button click
  const handleSearch = () => {
    // Update the URL for bookmarking/sharing
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    url.searchParams.set('loc', locationQuery);
    window.history.pushState({}, '', url.toString());
  };

  // Handle checkbox change for service types
  const handleServiceTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedServiceTypes(prev => [...prev, type]);
    } else {
      setSelectedServiceTypes(prev => prev.filter(t => t !== type));
    }
  };

  // Handle checkbox change for ratings
  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings(prev => [...prev, rating]);
    } else {
      setSelectedRatings(prev => prev.filter(r => r !== rating));
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setActiveTab("all");
    setPriceRange([0, 6000]);
    setSelectedRatings([]);
    setSelectedServiceTypes([]);
  };

  return (
    <main className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <img 
              src="/images/logo.png" 
              alt="PetPals Logo" 
              className="h-32 w-auto object-contain bg-white p-4 rounded-lg shadow-lg"
            />
          </div>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your location"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button size="lg" className="md:w-auto w-full" onClick={handleSearch}>
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
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={resetFilters}>
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
                          <Checkbox 
                            id={service.toLowerCase().replace(" ", "-")} 
                            checked={selectedServiceTypes.includes(service.toLowerCase().replace(" ", "-"))}
                            onCheckedChange={(checked) => 
                              handleServiceTypeChange(service.toLowerCase().replace(" ", "-"), checked === true)
                            }
                          />
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
                    <h4 className="font-medium mb-3">Price Range (Rs)</h4>
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={6000}
                        step={500}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Rs {priceRange[0]}</span>
                        <span>Rs {priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h4 className="font-medium mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <Checkbox 
                            id={`rating-${rating}`} 
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={(checked) => 
                              handleRatingChange(rating, checked === true)
                            }
                          />
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

                  <Button className="w-full" onClick={handleSearch}>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredServices.length} Available Service{filteredServices.length !== 1 ? 's' : ''}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Sort By:</span>
                  <span className="font-medium">Recommended</span>
                </Button>
              </div>
            </div>

            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="mb-8 flex items-center justify-between w-full">
                <div className="flex flex-wrap gap-2">
                  <TabsTrigger value="all">All Services</TabsTrigger>
                  <TabsTrigger value="walking">Dog Walking</TabsTrigger>
                  <TabsTrigger value="grooming">Pet Grooming</TabsTrigger>
                  <TabsTrigger value="boarding">Pet Boarding</TabsTrigger>
                  <TabsTrigger value="training">Pet Training</TabsTrigger>
                </div>
                {activeTab === "training" && (
                  <Button
                    variant="default"
                    className="ml-4 flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setIsMeetingOpen(true)}
                  >
                    <Video className="h-4 w-4" />
                    Join Virtual Training
                  </Button>
                )}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        id={service.id}
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
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No services found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                )}
              </TabsContent>

              {/* Other tab contents will be handled by the filtering logic */}
              <TabsContent value="walking" className="mt-0">
                {/* Content will be rendered by the filteredServices */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
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

              {/* Similar TabsContent for other categories */}

            </Tabs>

            {filteredServices.length > 6 && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Services
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {isMeetingOpen && (
        <JitsiMeet onClose={() => setIsMeetingOpen(false)} />
      )}
    </main>
  )
}
