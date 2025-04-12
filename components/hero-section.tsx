"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export function HeroSection() {
  const router = useRouter()
  const { toast } = useToast()
  const [findServiceOpen, setFindServiceOpen] = useState(false)
  const [becomeProviderOpen, setBecomeProviderOpen] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [location, setLocation] = useState("")
  
  // Provider form state
  const [providerName, setProviderName] = useState("")
  const [providerEmail, setProviderEmail] = useState("")
  const [providerPhone, setProviderPhone] = useState("")
  const [serviceOffered, setServiceOffered] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleFindService = () => {
    setFindServiceOpen(true);
  };

  const handleBecomeProvider = () => {
    setBecomeProviderOpen(true);
  };
  
  const handleFindServiceSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!serviceType || !location) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      })
      return;
    }
    
    toast({
      title: "Success! 🎉",
      description: "We're finding the best services in your area.",
    })
    
    // Close the modal first
    setFindServiceOpen(false)
    
    // Navigate after showing the toast
    setTimeout(() => {
      window.location.href = `/services?type=${encodeURIComponent(serviceType)}&location=${encodeURIComponent(location)}`;
    }, 2000)
  };
  
  const handleProviderSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!providerName || !providerEmail || !providerPhone || !serviceOffered || !agreeTerms) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields and accept the terms.",
      })
      return;
    }

    toast({
      title: "Application Submitted! 🎉",
      description: "Thank you for your interest in becoming a provider. We'll review your application and contact you soon.",
    })
    
    // Close the modal first
    setBecomeProviderOpen(false)
    
    // Reset form
    setProviderName("")
    setProviderEmail("")
    setProviderPhone("")
    setServiceOffered("")
    setAgreeTerms(false)
    
    // Navigate after showing the toast
    setTimeout(() => {
      window.location.href = '/';
    }, 2000)
  };

  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-foreground/90 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Trusted Pet Care Services at Your Fingertips
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Connect with verified dog walkers, groomers, and boarding services in your neighborhood. Your pet deserves
              the best care.
            </p>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Button
                variant="secondary"
                className="text-primary font-medium"
                onClick={() => setFindServiceOpen(true)}
              >
                Find a Service
              </Button>
              <Button
                variant="secondary"
                className="text-primary font-medium"
                onClick={() => setBecomeProviderOpen(true)} 
              >
                Become a Provider
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="flex flex-col items-end gap-4">
              <img 
                src="/images/logo.png" 
                alt="PetPals Logo" 
                className="h-64 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Find Service Modal */}
      <Dialog open={findServiceOpen} onOpenChange={setFindServiceOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Find the Perfect Pet Service</DialogTitle>
            <DialogDescription>
              Tell us what you're looking for and we'll match you with the best service providers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service-type" className="text-right">
                Service
              </Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog-walking">Dog Walking</SelectItem>
                  <SelectItem value="pet-grooming">Pet Grooming</SelectItem>
                  <SelectItem value="pet-boarding">Pet Boarding</SelectItem>
                  <SelectItem value="pet-training">Pet Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Your city or zip code"
                className="col-span-3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleFindServiceSubmit}>Find Services</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Become Provider Modal */}
      <Dialog open={becomeProviderOpen} onOpenChange={setBecomeProviderOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Become a Pet Service Provider</DialogTitle>
            <DialogDescription>
              Join our network of trusted pet care professionals. Fill out the form below to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                className="col-span-3"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                className="col-span-3"
                value={providerEmail}
                onChange={(e) => setProviderEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                className="col-span-3"
                value={providerPhone}
                onChange={(e) => setProviderPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="service-offered" className="text-right">
                Service
              </Label>
              <Select value={serviceOffered} onValueChange={setServiceOffered}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a service you offer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog-walking">Dog Walking</SelectItem>
                  <SelectItem value="pet-grooming">Pet Grooming</SelectItem>
                  <SelectItem value="pet-boarding">Pet Boarding</SelectItem>
                  <SelectItem value="pet-training">Pet Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <Checkbox 
                id="terms" 
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleProviderSubmit}
              disabled={!agreeTerms || !providerName || !providerEmail || !providerPhone || !serviceOffered}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
        {/* This would be an image of a happy dog with a walker */}
        <div className="w-full h-full bg-white/10 rounded-tl-3xl"></div>
      </div>
    </section>
  )
}
