"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import AnimatedCounter from "@/components/dashboard/animated-counter"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building, CreditCard, Smartphone, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardWithdrawPage() {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(1)

  const withdrawalMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      fee: "Free",
      time: "1-3 business days",
      description: "Direct to your bank account",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      fee: "$5",
      time: "3-5 business days",
      description: "Back to your original card",
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: Smartphone,
      fee: "1%",
      time: "24 hours",
      description: "PayPal, Skrill, Neteller",
      color: "bg-purple-50 border-purple-200 text-purple-700",
    },
  ]

  const handleWithdraw = () => {
    setStep(2)
    setTimeout(() => setStep(3), 2000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fadeInUp">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Withdraw Funds</h1>
            <p className="text-gray-600 mt-1">Transfer money from your trading account</p>
          </div>

          {step === 1 && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Account Balance */}
                <Card className="animate-slideInLeft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-600">Available Balance</h3>
                        <div className="text-3xl font-bold text-green-600 mt-2">
                          <AnimatedCounter end={50000} prefix="$" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-blue-600 mb-2">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Demo Account</span>
                        </div>
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          Practice Mode
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Withdrawal Methods */}
                <Card className="animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-6">Select Withdrawal Method</h3>
                    <div className="space-y-4">
                      {withdrawalMethods.map((method, index) => {
                        const Icon = method.icon
                        return (
                          <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                              selectedMethod === method.id
                                ? `${method.color} border-opacity-100`
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`p-3 rounded-full ${method.color.split(" ")[0]} mr-4`}>
                                  <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{method.name}</h4>
                                  <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                              </div>
                              <div className="text-right text-sm">
                                <div className="font-medium">Fee: {method.fee}</div>
                                <div className="text-gray-500">Time: {method.time}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Amount Input */}
                <Card className="animate-slideInLeft" style={{ animationDelay: "0.2s" }}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-6">Withdrawal Amount</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full p-4 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter amount"
                          min="50"
                          max="50000"
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        {[500, 1000, 2500, 5000].map((preset) => (
                          <Button
                            key={preset}
                            variant="outline"
                            onClick={() => setAmount(preset.toString())}
                            className="hover:bg-red-50 hover:border-red-300 transition-all duration-200 hover:scale-105"
                            disabled={preset > 50000}
                          >
                            ${preset}
                          </Button>
                        ))}
                      </div>

                      {selectedMethod === "bank" && (
                        <div className="space-y-4 pt-4 border-t animate-fadeInUp">
                          <h4 className="font-medium">Bank Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Bank Name"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                            <input
                              type="text"
                              placeholder="Account Number"
                              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Account Holder Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              <div className="animate-slideInRight">
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-6">Withdrawal Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="font-medium">
                          {withdrawalMethods.find((m) => m.id === selectedMethod)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">${amount || "0.00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee:</span>
                        <span className="font-medium">
                          {withdrawalMethods.find((m) => m.id === selectedMethod)?.fee}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing:</span>
                        <span className="font-medium text-sm">
                          {withdrawalMethods.find((m) => m.id === selectedMethod)?.time}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>You'll Receive:</span>
                        <span className="text-red-600">${amount || "0.00"}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleWithdraw}
                      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 transition-all duration-200 hover:scale-105"
                      disabled={!amount || Number.parseFloat(amount) < 50 || Number.parseFloat(amount) > 50000}
                    >
                      Withdraw ${amount || "0.00"}
                    </Button>

                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                      <p>• Minimum withdrawal: $50</p>
                      <p>• Maximum withdrawal: $50,000/day</p>
                      <p>• Demo account simulation</p>
                      <p>• Processing during business hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-bold mb-3 text-red-600">Important Notes</h4>
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
          )}

          {step === 2 && (
            <div className="flex items-center justify-center min-h-96">
              <Card className="w-full max-w-md animate-fadeInUp">
                <CardContent className="p-8 text-center">
                  <div className="animate-pulse-slow mb-6">
                    <Clock className="w-16 h-16 text-red-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Processing Withdrawal</h3>
                  <p className="text-gray-600 mb-4">Please wait while we process your withdrawal request...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center justify-center min-h-96">
              <Card className="w-full max-w-md animate-fadeInUp">
                <CardContent className="p-8 text-center">
                  <div className="animate-bounce-slow mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-600">Withdrawal Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Your withdrawal request for ${amount} has been submitted successfully. This is a demo simulation.
                  </p>
                  <div className="space-y-3">
                    <Link href="/dashboard">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Back to Dashboard</Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep(1)
                        setAmount("")
                      }}
                      className="w-full"
                    >
                      Make Another Withdrawal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
