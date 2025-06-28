"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, DollarSign, Copy, Share, CheckCircle } from "lucide-react"
import Link from "next/link"
import { demoUser } from "@/lib/demo-data"

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)

  const referralCode = "RYAN2024"
  const referralLink = `https://mexohub.org/register?ref=${referralCode}`

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 450.75,
    pendingEarnings: 125.5,
  }

  const recentReferrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john.s***@gmail.com",
      joinDate: "2024-12-25",
      status: "active",
      earnings: 25.0,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j***@yahoo.com",
      joinDate: "2024-12-23",
      status: "active",
      earnings: 50.0,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.c***@outlook.com",
      joinDate: "2024-12-20",
      status: "pending",
      earnings: 0.0,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
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
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
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
              <p className="text-white/80">Referral Program</p>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{referralStats.totalReferrals}</div>
                <div className="text-white/70 text-sm">Total Referrals</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold mb-1">${referralStats.totalEarnings}</div>
                <div className="text-white/70 text-sm">Total Earnings</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{referralStats.activeReferrals}</div>
                <div className="text-white/70 text-sm">Active Referrals</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold mb-1">${referralStats.pendingEarnings}</div>
                <div className="text-white/70 text-sm">Pending Earnings</div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Your Referral Link</h3>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <p className="text-sm text-white/70 mb-1">Referral Code</p>
                    <p className="font-mono text-lg">{referralCode}</p>
                  </div>
                  <Button onClick={handleCopy} className="bg-white/20 hover:bg-white/30 text-white">
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-white/70 mb-1">Referral Link</p>
                <p className="font-mono text-sm break-all">{referralLink}</p>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  Share Link
                </Button>
                <Button onClick={handleCopy} className="bg-green-600 hover:bg-green-700 text-white flex-1">
                  {copied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">How Referrals Work</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Share Your Link</p>
                    <p className="text-white/70 text-sm">Send your referral link to friends and family</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">They Sign Up</p>
                    <p className="text-white/70 text-sm">Your friends register using your referral link</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Earn Commission</p>
                    <p className="text-white/70 text-sm">Get 10% commission on their trading fees</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Referrals */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Recent Referrals</h3>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-white/70 text-sm">{referral.email}</p>
                        <p className="text-white/50 text-xs">
                          Joined: {new Date(referral.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">${referral.earnings}</div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          referral.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {referral.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
