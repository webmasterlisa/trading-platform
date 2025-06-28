"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, Briefcase, TrendingUp, Download, Upload, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { demoUser, walletStats } from "@/lib/demo-data"

export default function WalletPage() {
  const [selectedWallet, setSelectedWallet] = useState("main")

  const walletCards = [
    {
      title: "Total profits",
      amount: walletStats.totalProfits,
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Active Investment",
      amount: walletStats.activeInvestment,
      icon: Briefcase,
      color: "text-blue-500",
    },
    {
      title: "Total Deposits",
      amount: walletStats.totalDeposits,
      icon: Download,
      color: "text-purple-500",
    },
    {
      title: "Total withdrawal",
      amount: walletStats.totalWithdrawals,
      icon: Upload,
      color: "text-orange-500",
    },
    {
      title: "Pending Withdrawals",
      amount: walletStats.pendingWithdrawals,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Last deposit",
      amount: walletStats.lastDeposit,
      icon: DollarSign,
      color: "text-green-500",
    },
  ]

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
              <Link href="/dashboard">
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
          <div className="flex items-center space-x-4 mb-8">
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

          {/* Main Wallet Card */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium">Main wallet</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs">💼</span>
                </div>
              </div>

              <div>
                <p className="text-white/80 text-sm mb-2">Available balance</p>
                <div className="text-4xl font-bold">${demoUser.balance.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {walletCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Card key={index} className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-white text-lg font-bold mb-1">${card.amount.toLocaleString()}</div>
                    <div className="text-white/70 text-sm">{card.title}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link href="/dashboard/deposit">
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 py-6">
                <Download className="w-5 h-5 mr-2" />
                Deposit
              </Button>
            </Link>
            <Link href="/dashboard/withdraw">
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 py-6">
                <Upload className="w-5 h-5 mr-2" />
                Withdraw
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
