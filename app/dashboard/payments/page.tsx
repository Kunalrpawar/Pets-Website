"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, CreditCard, Download, Plus } from "lucide-react"

export default function PaymentsPage() {
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  // Mock data - would come from an API in a real app
  const paymentHistory = [
    {
      id: 1,
      service: "Dog Walking",
      provider: "Kunal Pawar",
      date: "May 12, 2023",
      amount: "$25.00",
      status: "Paid",
      invoice: "#INV-2023051201",
    },
    {
      id: 2,
      service: "Grooming",
      provider: "Michael Chen",
      date: "April 28, 2023",
      amount: "$60.00",
      status: "Paid",
      invoice: "#INV-2023042801",
    },
    {
      id: 3,
      service: "Vet Checkup",
      provider: "Dr. Sanket Verma",
      date: "April 15, 2023",
      amount: "$85.00",
      status: "Paid",
      invoice: "#INV-2023041501",
    },
    {
      id: 4,
      service: "Pet Sitting",
      provider: "Emily Johnson",
      date: "March 30, 2023",
      amount: "$120.00",
      status: "Paid",
      invoice: "#INV-2023033001",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4242",
      expiry: "09/25",
      default: true,
    },
    {
      id: 2,
      type: "Credit Card",
      name: "Mastercard ending in 5555",
      expiry: "12/24",
      default: false,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard({
      ...newCard,
      [name]: value,
    })
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Adding new card:", newCard)
    // Reset form
    setNewCard({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    })
    // Show success message or update UI
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage your payment methods and view transaction history</p>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="rounded-md border">
            <div className="py-3 px-4 text-sm font-medium grid grid-cols-6 gap-4 bg-muted/50">
              <div>Service</div>
              <div>Provider</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="py-3 px-4 text-sm grid grid-cols-6 gap-4 border-t">
                <div className="font-medium">{payment.service}</div>
                <div>{payment.provider}</div>
                <div>{payment.date}</div>
                <div>{payment.amount}</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {payment.status}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3 w-3" />
                    Invoice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{method.name}</CardTitle>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Expires {method.expiry}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div>
                    {method.default && (
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {!method.default && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add New Payment Method</CardTitle>
                <CardDescription>Enter your card information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCard} className="space-y-3">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input
                      id="name-on-card"
                      name="name"
                      placeholder="John Doe"
                      value={newCard.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        name="cvc"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-4 gap-1">
                    <Plus className="h-4 w-4" />
                    Add Card
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 