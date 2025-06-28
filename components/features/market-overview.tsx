"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export default function MarketOverview() {
  const [marketData, setMarketData] = useState([
    { name: "Forex", volume: "$6.6T", change: "+2.4%", positive: true },
    { name: "Commodities", volume: "$2.1T", change: "+1.8%", positive: true },
    { name: "Indices", volume: "$4.2T", change: "-0.3%", positive: false },
    { name: "Crypto", volume: "$1.8T", change: "+5.2%", positive: true },
  ])

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      {marketData.map((market, index) => (
        <Card key={market.name} className="card-hover animate-slideInUp" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">{market.name}</h3>
            <div className="text-2xl font-bold text-gray-900 mb-2">{market.volume}</div>
            <div
              className={`flex items-center justify-center text-sm ${market.positive ? "text-green-500" : "text-red-500"}`}
            >
              {market.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              {market.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
