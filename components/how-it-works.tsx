import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, CreditCard, ThumbsUp } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find the Perfect Service",
      description: "Browse through our verified pet care providers and find the perfect match for your pet's needs.",
    },
    {
      icon: Calendar,
      title: "Book with Ease",
      description: "Select your preferred date and time, and book your service in just a few clicks.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay securely through our platform with various payment options available.",
    },
    {
      icon: ThumbsUp,
      title: "Enjoy Peace of Mind",
      description: "Receive real-time updates and photos during the service, and leave a review afterward.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
      <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
        Finding and booking pet care services has never been easier
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 p-4 rounded-full inline-flex mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute -mt-12 ml-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground w-8 h-8 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
