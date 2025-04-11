import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, CheckCircle } from "lucide-react"

interface ProviderCardProps {
  name: string
  role: string
  rating: number
  reviews: number
  image: string
  location: string
  verified: boolean
}

export function ProviderCard({ name, role, rating, reviews, image, location, verified }: ProviderCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-64 object-cover" />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-muted-foreground">{role}</p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-sm font-medium">
              {rating} ({reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">Dogs</Badge>
          <Badge variant="outline">Cats</Badge>
          <Badge variant="outline">First Aid Certified</Badge>
        </div>

        <Button variant="outline" className="w-full">
          View Profile
        </Button>
      </CardContent>
    </Card>
  )
}
