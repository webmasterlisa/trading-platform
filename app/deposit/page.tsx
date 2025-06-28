"use client"

import { useState } from "react"
import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Building, Smartphone, Bitcoin } from "lucide-react"

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [amount, setAmount] = useState("")

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      fee: "2.5%",
      time: "Instant",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      fee: "Free",
      time: "1-3 business days",
      description: "Direct bank transfer",
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Smartphone,
      fee: "1%",
      time: "Instant",
      description: "PayPal, Skrill, Neteller",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      fee: "Network fee",
      time: "10-30 minutes",
      description: "Bitcoin, Ethereum, USDT",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Deposit Funds</h1>
            <p className="text-gray-600">Add money to your trading account</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Select Payment Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon
                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedMethod === method.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center mb-3">
                            <IconComponent className="w-6 h-6 text-orange-500 mr-3" />
                            <h4 className="font-medium">{method.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Fee: {method.fee}</span>
                            <span>Time: {method.time}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Deposit Amount</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter amount"
                        min="10"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[100, 500, 1000, 5000].map((preset) => (
                        <Button
                          key={preset}
                          variant="outline"
                          onClick={() => setAmount(preset.toString())}
                          className="text-sm"
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>

                    {selectedMethod === "card" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "bank" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Details</h4>
                          <div className="text-sm text-blue-800 space-y-1">
                            <p>
                              <strong>Bank Name:</strong> MexoHub Bank
                            </p>
                            <p>
                              <strong>Account Number:</strong> 1234567890
                            </p>
                            <p>
                              <strong>Routing Number:</strong> 021000021
                            </p>
                            <p>
                              <strong>Reference:</strong> Your Account ID
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMethod === "ewallet" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-Wallet Provider</label>
                          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option>PayPal</option>
                            <option>Skrill</option>
                            <option>Neteller</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-Wallet Email</label>
                          <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "crypto" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                            <option>Bitcoin (BTC)</option>
                            <option>Ethereum (ETH)</option>
                            <option>Tether (USDT)</option>
                          </select>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> Cryptocurrency deposits are subject to network confirmation times and
                            fees.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Deposit Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${amount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span className="font-medium">
                        {paymentMethods.find((m) => m.id === selectedMethod)?.fee || "0%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium text-sm">
                        {paymentMethods.find((m) => m.id === selectedMethod)?.time || "Instant"}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${amount || "0.00"}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                    disabled={!amount || Number.parseFloat(amount) < 10}
                  >
                    Deposit ${amount || "0.00"}
                  </Button>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>• Minimum deposit: $10</p>
                    <p>• Maximum deposit: $50,000</p>
                    <p>• Funds available immediately after confirmation</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
