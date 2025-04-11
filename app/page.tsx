import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Star, Clock, Shield, Heart } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { ServiceCard } from "@/components/service-card"
import { ProviderCard } from "@/components/provider-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8 -mt-20 relative z-10">
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
                Find Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Popular Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Services</h2>
          <Link href="/services">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <Tabs defaultValue="walking" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="walking">Dog Walking</TabsTrigger>
            <TabsTrigger value="grooming">Pet Grooming</TabsTrigger>
            <TabsTrigger value="boarding">Pet Boarding</TabsTrigger>
            <TabsTrigger value="training">Pet Training</TabsTrigger>
          </TabsList>

          <TabsContent value="walking" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Daily Dog Walking"
                description="Professional dog walkers for your furry friend"
                price={20}
                rating={4.8}
                image="/images/dog walking.jpeg"
                category="walking"
              />
              <ServiceCard
                title="Group Dog Walking"
                description="Socialization and exercise in a group setting"
                price={15}
                rating={4.6}
                image="/images/group dog.jpeg"
                category="walking"
              />
              <ServiceCard
                title="Premium Dog Walking"
                description="One-on-one attention with photo updates"
                price={30}
                rating={4.9}
                image="/images/gropuss.jpeg"
                category="walking"
                featured={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="grooming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Basic Grooming"
                description="Bath, brush, and nail trimming"
                price={40}
                rating={4.7}
                image="/placeholder.svg?height=200&width=300"
                category="grooming"
              />
              <ServiceCard
                title="Full Service Grooming"
                description="Complete grooming package for all breeds"
                price={65}
                rating={4.9}
                image="/placeholder.svg?height=200&width=300"
                category="grooming"
                featured={true}
              />
              <ServiceCard
                title="Specialty Styling"
                description="Custom cuts and styling for show dogs"
                price={85}
                rating={4.8}
                image="/placeholder.svg?height=200&width=300"
                category="grooming"
              />
            </div>
          </TabsContent>

          {/* Other tab contents would be similar */}
          <TabsContent value="boarding" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Boarding services would go here */}</div>
          </TabsContent>

          <TabsContent value="training" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* Training services would go here */}</div>
          </TabsContent>
        </Tabs>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Top Providers */}
      <section className="container mx-auto px-4 py-16 bg-slate-50">
        <h2 className="text-3xl font-bold mb-8">Top-Rated Service Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProviderCard
            name="Sarah Johnson"
            role="Dog Walker & Trainer"
            rating={4.9}
            reviews={124}
            image="/placeholder.svg?height=300&width=300"
            location="Brooklyn, NY"
            verified={true}
          />
          <ProviderCard
            name="Michael Chen"
            role="Professional Groomer"
            rating={4.8}
            reviews={98}
            image="/placeholder.svg?height=300&width=300"
            location="Queens, NY"
            verified={true}
          />
          <ProviderCard
            name="Jessica Williams"
            role="Pet Boarder"
            rating={4.7}
            reviews={56}
            image="/placeholder.svg?height=300&width=300"
            location="Manhattan, NY"
            verified={true}
          />
          <ProviderCard
            name="David Rodriguez"
            role="Dog Walker"
            rating={4.6}
            reviews={42}
            image="/placeholder.svg?height=300&width=300"
            location="Bronx, NY"
            verified={false}
          />
        </div>
        <div className="text-center mt-8">
          <Link href="/providers">
            <Button size="lg">View All Providers</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2">What Pet Parents Say</h2>
        <p className="text-muted-foreground mb-8">Real experiences from our community</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Finding a reliable dog walker was so easy with PetPals. Sarah is amazing with my Labrador!"
            author="Emma Thompson"
            petType="Labrador owner"
            rating={5}
            image="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="The grooming service was top-notch. My poodle has never looked better!"
            author="James Wilson"
            petType="Poodle owner"
            rating={5}
            image="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="I was nervous about boarding my cat, but the updates and photos gave me peace of mind."
            author="Sophia Garcia"
            petType="Cat owner"
            rating={4}
            image="/placeholder.svg?height=100&width=100"
          />
        </div>
      </section>

      {/* App Features */}
      <section className="container mx-auto px-4 py-16 bg-primary/5">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose PetPals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Providers</h3>
            <p className="text-muted-foreground">All service providers undergo background checks and verification</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">Get notifications and photos during your pet's service</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-muted-foreground">Satisfaction guaranteed or your money back</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pet-First Approach</h3>
            <p className="text-muted-foreground">Services tailored to your pet's unique needs</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find the perfect pet care?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet parents who've found reliable, loving care for their furry family members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Become a Provider
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              Find Services
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
