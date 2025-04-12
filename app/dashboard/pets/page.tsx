"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, Trash2 } from "lucide-react"

export default function PetsPage() {
  const [open, setOpen] = useState(false)
  const [editPet, setEditPet] = useState<null | {
    id: number
    name: string
    type: string
    breed: string
    age: string
    weight: string
    gender: string
    microchip: string
    medical: string
    image: string
  }>(null)

  // Mock data - would come from an API in a real app
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "70 lbs",
      gender: "Male",
      microchip: "123456789012345",
      medical: "No known allergies. Annual checkup in June.",
      image: "/placeholder.svg?height=100&width=100"
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      weight: "9 lbs",
      gender: "Female",
      microchip: "987654321098765",
      medical: "Allergic to chicken. Requires special dental care.",
      image: "/placeholder.svg?height=100&width=100"
    }
  ])

  const handleOpenDialog = (pet: null | typeof pets[0] = null) => {
    setEditPet(pet)
    setOpen(true)
  }

  const handleSavePet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const petData = {
      id: editPet ? editPet.id : Date.now(),
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      breed: formData.get("breed") as string,
      age: formData.get("age") as string,
      weight: formData.get("weight") as string,
      gender: formData.get("gender") as string,
      microchip: formData.get("microchip") as string,
      medical: formData.get("medical") as string,
      image: "/placeholder.svg?height=100&width=100" // In a real app, you would upload images
    }
    
    if (editPet) {
      // Update existing pet
      setPets(pets.map(p => p.id === editPet.id ? petData : p))
    } else {
      // Add new pet
      setPets([...pets, petData])
    }
    
    setOpen(false)
    setEditPet(null)
  }

  const handleDeletePet = (id: number) => {
    // In a real app, you'd want a confirmation dialog here
    setPets(pets.filter(pet => pet.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Pets</h1>
          <p className="text-muted-foreground">Manage your pets and their information</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Pet
        </Button>
      </div>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-32 bg-muted flex items-center justify-center relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={pet.image} alt={pet.name} />
                    <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                      onClick={() => handleOpenDialog(pet)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm text-destructive"
                      onClick={() => handleDeletePet(pet.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-semibold">{pet.name}</h2>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {pet.type}
                  </Badge>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{pet.age}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">Weight:</span>
                    <span>{pet.weight}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>{pet.gender}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <span className="text-muted-foreground">Microchip:</span>
                    <span className="truncate">{pet.microchip}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-6 py-3">
                <Button variant="outline" className="w-full">View Complete Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 flex flex-col items-center justify-center">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No pets added yet</h3>
          <p className="text-muted-foreground text-center mb-4">
            Add your pet's information to help service providers take better care of them.
          </p>
          <Button onClick={() => handleOpenDialog()}>Add Your First Pet</Button>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSavePet}>
            <DialogHeader>
              <DialogTitle>{editPet ? "Edit Pet Information" : "Add a New Pet"}</DialogTitle>
              <DialogDescription>
                {editPet 
                  ? "Update your pet's details to ensure they receive the best care."
                  : "Fill in your pet's details to help service providers take better care of them."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editPet?.name || ""}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Pet Type</Label>
                  <Select
                    name="type"
                    defaultValue={editPet?.type || ""}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Fish">Fish</SelectItem>
                      <SelectItem value="Small Pet">Small Pet</SelectItem>
                      <SelectItem value="Reptile">Reptile</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    name="breed"
                    defaultValue={editPet?.breed || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    defaultValue={editPet?.age || ""}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    defaultValue={editPet?.weight || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    defaultValue={editPet?.gender || ""}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="microchip">Microchip Number (optional)</Label>
                <Input
                  id="microchip"
                  name="microchip"
                  defaultValue={editPet?.microchip || ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medical">Medical Information (optional)</Label>
                <Textarea
                  id="medical"
                  name="medical"
                  rows={3}
                  placeholder="Allergies, medications, special needs, etc."
                  defaultValue={editPet?.medical || ""}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editPet ? "Save Changes" : "Add Pet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 