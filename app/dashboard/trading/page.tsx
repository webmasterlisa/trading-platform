"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import TradingChart from "@/components/dashboard/trading-chart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState("EUR/USD")
  const [tradeType, setTradeType] = useState("BUY")
  const [amount, setAmount] = useState("0.1")
  const [leverage, setLeverage] = useState("1:100")

  const tradingPairs = [
    { symbol: "EUR/USD", price: "1.17250", change: "+0.0025", percent: "+0.21%", positive: true },
    { symbol: "GBP/USD", price: "1.35420", change: "-0.0012", percent: "-0.09%", positive: false },
    { symbol: "USD/JPY", price: "149.850", change: "+0.125", percent: "+0.08%", positive: true },
    { symbol: "Gold", price: "2045.50", change: "+12.30", percent: "+0.60%", positive: true },
    { symbol: "BTC/USD", price: "43250.00", change: "-850.00", percent: "-1.93%", positive: false },
    { symbol: "ETH/USD", price: "2580.50", change: "+45.20", percent: "+1.78%", positive: true },
  ]

  const openPositions = [
    {
      pair: "EUR/USD",
      type: "BUY",
      amount: 0.1,
      openPrice: "1.17200",
      currentPrice: "1.17250",
      profit: 5.0,
      positive: true,
    },
    {
      pair: "GBP/USD",
      type: "SELL",
      amount: 0.05,
      openPrice: "1.35500",
      currentPrice: "1.35420",
      profit: 4.0,
      positive: true,
    },
    {
      pair: "Gold",
      type: "BUY",
      amount: 0.01,
      openPrice: "2040.00",
      currentPrice: "2045.50",
      profit: 5.5,
      positive: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900">Trading Platform</h1>
            <p className="text-gray-600 mt-1">Trade forex, commodities, and cryptocurrencies</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Trading Pairs */}
            <div className="lg:col-span-1">
              <Card className="animate-slideInLeft">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-4">Market Watch</h3>
                  <div className="space-y-2">
                    {tradingPairs.map((pair, index) => (
                      <div
                        key={pair.symbol}
                        onClick={() => setSelectedPair(pair.symbol)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                          selectedPair === pair.symbol ? "bg-orange-500 text-white" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{pair.symbol}</div>
                            <div className="text-sm opacity-75">{pair.price}</div>
                          </div>
                          <div
                            className={`text-right text-sm ${
                              selectedPair === pair.symbol
                                ? "text-white"
                                : pair.positive
                                  ? "text-green-600"
                                  : "text-red-600"
                            }`}
                          >
                            <div>{pair.change}</div>
                            <div>{pair.percent}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart and Trading */}
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-fadeInUp">
                <TradingChart symbol={selectedPair} />
              </div>

              {/* Trading Panel */}
              <Card className="animate-slideInUp">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Place Order</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Button
                      onClick={() => setTradeType("BUY")}
                      className={`py-3 ${
                        tradeType === "BUY"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      BUY
                    </Button>
                    <Button
                      onClick={() => setTradeType("SELL")}
                      className={`py-3 ${
                        tradeType === "SELL"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      SELL
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount (Lots)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        step="0.01"
                        min="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Leverage</label>
                      <select
                        value={leverage}
                        onChange={(e) => setLeverage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option>1:50</option>
                        <option>1:100</option>
                        <option>1:200</option>
                        <option>1:500</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Optional"
                          step="0.00001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Take Profit</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Optional"
                          step="0.00001"
                        />
                      </div>
                    </div>

                    <Button
                      className={`w-full py-3 text-white transition-all duration-200 hover:scale-105 ${
                        tradeType === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {tradeType} {selectedPair}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Open Positions */}
            <div className="lg:col-span-1">
              <Card className="animate-slideInRight">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-4">Open Positions</h3>
                  <div className="space-y-3">
                    {openPositions.map((position, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium text-sm">{position.pair}</div>
                            <div className="text-xs text-gray-500">
                              {position.type} {position.amount}
                            </div>
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded ${
                              position.type === "BUY" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {position.type}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">Open: {position.openPrice}</div>
                        <div className="text-xs text-gray-600 mb-2">Current: {position.currentPrice}</div>
                        <div className="flex justify-between items-center">
                          <div
                            className={`text-sm font-medium ${position.positive ? "text-green-600" : "text-red-600"}`}
                          >
                            {position.positive ? "+" : ""}${position.profit}
                          </div>
                          <Button size="sm" variant="outline" className="text-xs px-2 py-1 bg-transparent">
                            Close
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900 mb-1">Total P&L</div>
                    <div className="text-lg font-bold text-green-600">+$14.50</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
