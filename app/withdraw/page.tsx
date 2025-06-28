"use client"

import { useState } from "react"
import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Building, Smartphone, AlertCircle } from "lucide-react"

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [amount, setAmount] = useState("")

  const withdrawalMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      fee: "Free",
      time: "1-3 business days",
      description: "Direct to your bank account",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      fee: "$5",
      time: "3-5 business days",
      description: "Back to your original card",
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Smartphone,
      fee: "1%",
      time: "24 hours",
      description: "PayPal, Skrill, Neteller",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Withdraw Funds</h1>
            <p className="text-gray-600">Transfer money from your trading account</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm text-blue-700">Available Balance: $12,450.00</span>
                  </div>

                  <h3 className="text-lg font-bold mb-6">Select Withdrawal Method</h3>
                  <div className="space-y-4">
                    {withdrawalMethods.map((method) => {
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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <IconComponent className="w-6 h-6 text-orange-500 mr-3" />
                              <div>
                                <h4 className="font-medium">{method.name}</h4>
                                <p className="text-sm text-gray-600">{method.description}</p>
                              </div>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <div>Fee: {method.fee}</div>
                              <div>Time: {method.time}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Withdrawal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount (USD)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter amount"
                        min="50"
                        max="12450"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {[500, 1000, 2500, 5000].map((preset) => (
                        <Button
                          key={preset}
                          variant="outline"
                          onClick={() => setAmount(preset.toString())}
                          className="text-sm"
                          disabled={preset > 12450}
                        >
                          ${preset}
                        </Button>
                      ))}
                    </div>

                    {selectedMethod === "bank" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter bank name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter account number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter routing number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter account holder name"
                          />
                        </div>
                      </div>
                    )}

                    {selectedMethod === "card" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> Withdrawals can only be made to the original card used for deposit.
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number (Last 4 digits)
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="****"
                            maxLength="4"
                          />
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

                    <div className="pt-4 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Withdrawal (Optional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter reason for withdrawal..."
                      ></textarea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Withdrawal Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">${amount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fee:</span>
                      <span className="font-medium">
                        {withdrawalMethods.find((m) => m.id === selectedMethod)?.fee || "Free"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium text-sm">
                        {withdrawalMethods.find((m) => m.id === selectedMethod)?.time || "1-3 days"}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>You'll Receive:</span>
                      <span>${amount || "0.00"}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white"
                    disabled={!amount || Number.parseFloat(amount) < 50 || Number.parseFloat(amount) > 12450}
                  >
                    Withdraw ${amount || "0.00"}
                  </Button>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>• Minimum withdrawal: $50</p>
                    <p>• Maximum withdrawal: $50,000/day</p>
                    <p>• Identity verification required</p>
                    <p>• Processing may take longer for first withdrawal</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3">Important Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Withdrawals are processed during business hours</li>
                    <li>• Additional verification may be required</li>
                    <li>• Funds must be from closed positions only</li>
                    <li>• Contact support for urgent withdrawals</li>
                  </ul>
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
