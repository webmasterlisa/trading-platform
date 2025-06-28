"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, User, MessageCircle, TrendingUp } from "lucide-react"

export default function Component() {
  const [chatOpen, setChatOpen] = useState(false)

  const tickerData = [
    { symbol: "EUR/USD", price: "1.17257", change: "+0.00", percent: "(+0.25%)", positive: true, icon: "🇪🇺" },
    { symbol: "BTC/USD", price: "106,744", change: "-260.00", percent: "(-0.24%)", positive: false, icon: "₿" },
    { symbol: "ETH/USD", price: "2,426.2", change: "+8.9", percent: "(+0.37%)", positive: true, icon: "Ξ" },
    { symbol: "S&P 500", price: "6,156.0", change: "+11.80", percent: "(+0.19%)", positive: true, icon: "500" },
  ]

  const tradingCards = [
    {
      symbol: "FB",
      name: "Facebook",
      price: "500.32",
      change: "1.68 (0.66%)",
      icon: "📘",
      chart: true,
    },
    {
      symbol: "GBPUSD",
      name: "Pound/Dollar",
      price: "$3500.98",
      change: "1.68 (0.66%)",
      icon: "🇬🇧🇺🇸",
      chart: true,
    },
    {
      symbol: "Gold",
      name: "Gold",
      price: "$5000.33",
      change: "1.68 (0.66%)",
      icon: "🥇",
      chart: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Ticker Tape */}
      <div className="bg-gray-900 text-white py-2 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {tickerData.map((item, index) => (
            <div key={index} className="flex items-center mx-8 text-sm">
              <span className="mr-2">{item.icon}</span>
              <span className="font-medium mr-2">{item.symbol}</span>
              <span className="mr-2">{item.price}</span>
              <span className={`mr-1 ${item.positive ? "text-green-400" : "text-red-400"}`}>{item.change}</span>
              <span className={item.positive ? "text-green-400" : "text-red-400"}>{item.percent}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-orange-500">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-l">m</span>
            <span className="bg-orange-400 text-white px-2 py-1">x</span>
            <span className="bg-orange-300 text-white px-2 py-1 rounded-r">o</span>
            <span className="ml-2 text-gray-800">mexohub</span>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
            <span>About</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
            <span>Support (FAQ)</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
            <span>Pricing</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
            <span>Contact</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <User className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">GET STARTED</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6">TRADE WISELY</h1>
            <h2 className="text-4xl font-light text-gray-800 mb-8">
              Choose from <span className="font-bold">5000s</span> of{" "}
              <span className="text-orange-500 font-bold">Currencies</span>
            </h2>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium mb-4">
              CREATE ACCOUNT →
            </Button>
            <p className="text-gray-600 text-sm">To start earning</p>
          </div>

          {/* Trading Cards */}
          <div className="grid gap-6">
            {tradingCards.map((card, index) => (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{card.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{card.symbol}</h3>
                        <p className="text-gray-600 text-sm">{card.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{card.price}</div>
                      <div className="text-orange-500 text-sm">+{card.change}</div>
                    </div>
                  </div>
                  {card.chart && (
                    <div className="mt-4 h-16 flex items-end justify-center">
                      <TrendingUp className="w-full h-12 text-green-400" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="fixed top-1/2 right-4 text-xs text-gray-400 transform rotate-90 origin-center">
        Trading involves significant risk. Always massive profits.
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        {chatOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64">
            <h3 className="font-bold mb-2">Chat with us</h3>
            <p className="text-sm text-gray-600">How can we help you today?</p>
          </div>
        )}
      </div>
    </div>
  )
}
