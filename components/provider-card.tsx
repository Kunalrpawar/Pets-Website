"use client"

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          {verified && (
            <Badge className="absolute top-2 right-2 bg-primary text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{role}</p>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground text-sm">({reviews} reviews)</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
