import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  featured?: boolean
}

export function ServiceCard({
  title,
  description,
  price,
  rating,
  image,
  category,
  featured = false,
}: ServiceCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${featured ? "border-primary" : ""}`}>
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        {featured && <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>}
        <Badge className="absolute top-2 left-2" variant="outline">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>30-60 min</span>
          <MapPin className="h-4 w-4 ml-4 mr-1" />
          <span>1.2 miles away</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            ${price}
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">Book Now</Button>
      </CardFooter>
    </Card>
  )
}
