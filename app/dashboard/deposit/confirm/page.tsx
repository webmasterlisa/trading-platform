"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Send, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { demoUser } from "@/lib/demo-data"

export default function ConfirmDepositPage() {
  const [copied, setCopied] = useState(false)
  const [amount, setAmount] = useState("120.00")
  const [paymentMethod, setPaymentMethod] = useState("Bitcoin")
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlAmount = searchParams.get("amount")
    const urlMethod = searchParams.get("method")
    if (urlAmount) setAmount(urlAmount)
    if (urlMethod) setPaymentMethod(urlMethod)
  }, [searchParams])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(demoUser.bitcoin_wallet || "")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const generateQRCode = (address: string) => {
    // Simple QR code pattern for demo
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" fill="white"/>
        <g fill="black">
          <rect x="10" y="10" width="10" height="10"/>
          <rect x="30" y="10" width="10" height="10"/>
          <rect x="50" y="10" width="10" height="10"/>
          <rect x="70" y="10" width="10" height="10"/>
          <rect x="90" y="10" width="10" height="10"/>
          <rect x="10" y="30" width="10" height="10"/>
          <rect x="30" y="30" width="10" height="10"/>
          <rect x="50" y="30" width="10" height="10"/>
          <rect x="70" y="30" width="10" height="10"/>
          <rect x="90" y="30" width="10" height="10"/>
          <rect x="10" y="50" width="10" height="10"/>
          <rect x="30" y="50" width="10" height="10"/>
          <rect x="50" y="50" width="10" height="10"/>
          <rect x="70" y="50" width="10" height="10"/>
          <rect x="90" y="50" width="10" height="10"/>
          <rect x="10" y="70" width="10" height="10"/>
          <rect x="30" y="70" width="10" height="10"/>
          <rect x="50" y="70" width="10" height="10"/>
          <rect x="70" y="70" width="10" height="10"/>
          <rect x="90" y="70" width="10" height="10"/>
          <rect x="10" y="90" width="10" height="10"/>
          <rect x="30" y="90" width="10" height="10"/>
          <rect x="50" y="90" width="10" height="10"/>
          <rect x="70" y="90" width="10" height="10"/>
          <rect x="90" y="90" width="10" height="10"/>
        </g>
      </svg>
    `)}`
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex-1 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-orange-400"></div>

        {/* Content */}
        <div className="relative z-10 p-6 text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/deposit">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* User Greeting */}
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">👤</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {demoUser.first_name} {demoUser.last_name}
              </h1>
              <p className="text-white/80">Good day</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-8">Confirm Deposit</h2>

            {/* Amount */}
            <div className="mb-8">
              <div className="text-5xl font-bold mb-2">${amount}</div>
              <div className="text-white/80 text-lg">Total Amount</div>
            </div>

            {/* QR Code Card */}
            <div className="bg-white rounded-2xl p-8 mb-6 text-center">
              <div className="mb-4">
                <img src={generateQRCode(demoUser.bitcoin_wallet || "")} alt="QR Code" className="w-32 h-32 mx-auto" />
              </div>
              <div className="text-gray-800 text-sm font-mono break-all">{demoUser.bitcoin_wallet}</div>
            </div>

            {/* Instructions */}
            <p className="text-white/80 mb-8">Send ${amount} to this address</p>

            {/* Action Buttons */}
            <div className="flex space-x-6">
              <button onClick={handleCopy} className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  {copied ? <CheckCircle className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
                </div>
                <span className="text-sm">{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Send className="w-6 h-6" />
                </div>
                <span className="text-sm">Send</span>
              </button>

              <Link href="/dashboard/deposit" className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <X className="w-6 h-6" />
                </div>
                <span className="text-sm">Cancel</span>
              </Link>
            </div>

            {/* Payment Info */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">Payment Method: {paymentMethod}</p>
              <p className="text-white/60 text-xs mt-2">Confirmation time: 10-30 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
