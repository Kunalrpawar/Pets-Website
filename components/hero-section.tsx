import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-foreground/90 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted Pet Care Services at Your Fingertips
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Connect with verified dog walkers, groomers, and boarding services in your neighborhood. Your pet deserves
            the best care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary">
              Find a Service
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Become a Provider
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
        {/* This would be an image of a happy dog with a walker */}
        <div className="w-full h-full bg-white/10 rounded-tl-3xl"></div>
      </div>
    </section>
  )
}
