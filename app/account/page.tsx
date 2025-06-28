"use client"

import { useState } from "react"
import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, TrendingUp, DollarSign, Eye, EyeOff } from "lucide-react"

export default function AccountPage() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Dashboard</h1>
            <p className="text-gray-600">Manage your trading account and settings</p>
          </div>

          {/* Account Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-600">Account Balance</h3>
                  <button onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-2xl font-bold text-green-600">{showBalance ? "$12,450.00" : "••••••"}</div>
                <p className="text-sm text-gray-500">Available for trading</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-600 mb-4">Today's P&L</h3>
                <div className="text-2xl font-bold text-green-600">+$234.50</div>
                <p className="text-sm text-gray-500">+1.92% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-600 mb-4">Open Positions</h3>
                <div className="text-2xl font-bold text-gray-900">7</div>
                <p className="text-sm text-gray-500">Active trades</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Deposit</p>
                          <p className="text-sm text-gray-500">Dec 27, 2024</p>
                        </div>
                        <span className="text-green-600 font-medium">+$1,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">EUR/USD Trade</p>
                          <p className="text-sm text-gray-500">Dec 26, 2024</p>
                        </div>
                        <span className="text-green-600 font-medium">+$45.20</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Gold Trade</p>
                          <p className="text-sm text-gray-500">Dec 25, 2024</p>
                        </div>
                        <span className="text-red-600 font-medium">-$23.50</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Deposit Funds
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Start Trading
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Profile</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trading" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Trading Preferences</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Leverage</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                        <option>1:50</option>
                        <option>1:100</option>
                        <option>1:200</option>
                        <option>1:500</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Risk Management</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Enable stop loss by default</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Enable take profit by default</span>
                        </label>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Security</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Enable Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Notifications</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm">SMS notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Push notifications</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
