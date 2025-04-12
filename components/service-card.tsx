import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ServiceCardProps {
  title: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  featured?: boolean
  id?: number
}

export function ServiceCard({
  title,
  description,
  price,
  rating,
  image,
  category,
  featured = false,
  id = 1
}: ServiceCardProps) {
  const router = typeof window !== 'undefined' ? { push: (url: string) => window.location.href = url } : null;
  const [isHovered, setIsHovered] = useState(false);

  const handleBookNow = () => {
    // In a real app, this would navigate to the booking page for this specific service
    if (router) {
      router.push(`/booking/${id}?service=${encodeURIComponent(title)}`);
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all ${isHovered ? 'shadow-lg transform scale-[1.02]' : ''} ${featured ? "border-primary" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
        {featured && <Badge className="absolute top-2 right-2 bg-primary">Popular</Badge>}
        <Badge className="absolute top-2 left-2" variant="outline">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="font-semibold">Rs {price}/hr</div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full" onClick={handleBookNow}>Book Now</Button>
      </CardFooter>
    </Card>
  )
}
