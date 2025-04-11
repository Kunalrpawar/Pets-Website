import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  petType: string
  rating: number
  image: string
}

export function TestimonialCard({ quote, author, petType, rating, image }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="text-lg mb-6 italic">"{quote}"</p>

        <div className="flex items-center">
          <img src={image || "/placeholder.svg"} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-sm text-muted-foreground">{petType}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
