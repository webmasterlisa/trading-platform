"use client"

import { useState, useEffect } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import AnimatedCounter from "@/components/dashboard/animated-counter"
import TradingChart from "@/components/dashboard/trading-chart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Activity, Eye, EyeOff, ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react"

interface DashboardData {
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    account_type: "demo" | "live"
    balance: number
    demo_balance: number
    is_verified: boolean
    is_admin: boolean
  }
  stats: {
    accountBalance: number
    todayPnl: number
    totalProfit: number
    openPositions: number
  }
  recentTransactions: any[]
  recentTrades: any[]
}

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [demoMode, setDemoMode] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
        setDemoMode(data.user.account_type === 'demo')
      } else {
        console.error("Failed to fetch dashboard data")
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Failed to load dashboard data</p>
            <Button onClick={fetchDashboardData} className="mt-4">Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Account Balance",
      value: dashboardData.stats.accountBalance,
      prefix: "$",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Today's P&L",
      value: dashboardData.stats.todayPnl,
      prefix: dashboardData.stats.todayPnl >= 0 ? "+$" : "$",
      icon: TrendingUp,
      color: dashboardData.stats.todayPnl >= 0 ? "text-green-500" : "text-red-500",
      bgColor: dashboardData.stats.todayPnl >= 0 ? "bg-green-50" : "bg-red-50",
    },
    {
      title: "Open Positions",
      value: dashboardData.stats.openPositions,
      suffix: "",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      decimals: 0,
    },
    {
      title: "Total Profit",
      value: dashboardData.stats.totalProfit,
      prefix: "$",
      icon: ArrowUpRight,
      color: dashboardData.stats.totalProfit >= 0 ? "text-purple-500" : "text-red-500",
      bgColor: dashboardData.stats.totalProfit >= 0 ? "bg-purple-50" : "bg-red-50",
    },
  ]

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const recentTrades = dashboardData.recentTrades.map(trade => ({
    pair: trade.symbol,
    type: trade.type.toUpperCase(),
    amount: trade.amount,
    profit: trade.profit_loss || 0,
    time: formatTimeAgo(trade.opened_at),
    positive: (trade.profit_loss || 0) >= 0,
  }))

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {dashboardData.user.first_name} {dashboardData.user.last_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Demo Mode</span>
                <button
                  onClick={() => setDemoMode(!demoMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    demoMode ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      demoMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {demoMode && (
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                  Demo Account
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="card-hover animate-slideInLeft"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center mt-2">
                        {stat.title === "Account Balance" && (
                          <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="mr-2 text-gray-400 hover:text-gray-600"
                          >
                            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        )}
                        <div className="text-2xl font-bold text-gray-900">
                          {stat.title === "Account Balance" && !showBalance ? (
                            "••••••"
                          ) : (
                            <AnimatedCounter
                              end={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              decimals={stat.decimals || 2}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-slideInLeft" style={{ animationDelay: "0.2s" }}>
                <TradingChart symbol="EUR/USD" />
              </div>
              <div className="animate-slideInRight" style={{ animationDelay: "0.3s" }}>
                <TradingChart symbol="GBP/USD" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-slideInLeft" style={{ animationDelay: "0.4s" }}>
                <TradingChart symbol="USD/JPY" />
              </div>
              <div className="animate-slideInRight" style={{ animationDelay: "0.5s" }}>
                <TradingChart symbol="Gold" />
              </div>
            </div>
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Trades</h3>
                  <Button size="sm" variant="outline">
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentTrades.length > 0 ? (
                    recentTrades.map((trade, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${trade.positive ? "bg-green-100" : "bg-red-100"}`}>
                            {trade.positive ? (
                              <ArrowUpRight className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{trade.pair}</div>
                            <div className="text-sm text-gray-500">
                              {trade.type} {trade.amount}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${trade.positive ? "text-green-600" : "text-red-600"}`}>
                            {trade.positive ? "+" : ""}${trade.profit}
                          </div>
                          <div className="text-xs text-gray-500">{trade.time}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No trades yet</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Buy
                  </Button>
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent">
                    <Minus className="w-4 h-4 mr-2" />
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col space-y-2">
            <DollarSign className="w-8 h-8" />
            <span>Deposit</span>
          </Button>
          <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-gray-50 bg-transparent">
            <ArrowUpRight className="w-8 h-8" />
            <span>Withdraw</span>
          </Button>
          <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-gray-50 bg-transparent">
            <Activity className="w-8 h-8" />
            <span>History</span>
          </Button>
          <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-gray-50 bg-transparent">
            <TrendingUp className="w-8 h-8" />
            <span>Analytics</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
