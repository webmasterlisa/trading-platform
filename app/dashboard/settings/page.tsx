"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Shield, Bell, Palette } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ]

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
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account preferences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="animate-slideInLeft">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === tab.id ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-3" />
                          {tab.label}
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card className="animate-slideInRight">
                  <CardContent className="p-6">
                    <div className="gradient-bg text-white p-6 rounded-lg mb-6">
                      <h2 className="text-2xl font-bold mb-2">It's Your Profile</h2>
                      <p className="opacity-90">Update your personal information</p>
                    </div>

                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Full name</label>
                        <input
                          type="text"
                          defaultValue="ryan parker"
                          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          defaultValue="ryanparker"
                          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          defaultValue="ryanparkermt5@proton.me"
                          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Bitcoin Wallet Address
                        </label>
                        <input
                          type="text"
                          defaultValue="lfite"
                          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your USDT (Trc20) Wallet address
                        </label>
                        <input
                          type="text"
                          defaultValue="lfite"
                          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50"
                        />
                      </div>

                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">Update Profile</Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "security" && (
                <Card className="animate-slideInRight">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                    <div className="space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="font-medium text-yellow-800 mb-2">Two-Factor Authentication</h3>
                        <p className="text-sm text-yellow-700 mb-3">Secure your account with 2FA</p>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                          Enable 2FA
                        </Button>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Password</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "notifications" && (
                <Card className="animate-slideInRight">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Email Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span>Trade confirmations</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span>Account balance updates</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span>Market news and analysis</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium">Push Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" defaultChecked />
                            <span>Price alerts</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-3" />
                            <span>Margin calls</span>
                          </label>
                        </div>
                      </div>

                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "appearance" && (
                <Card className="animate-slideInRight">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Theme</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 border-2 border-orange-500 rounded-lg bg-orange-50 cursor-pointer">
                            <div className="w-full h-16 bg-white rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Light</p>
                          </div>
                          <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                            <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Dark</p>
                          </div>
                          <div className="p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                            <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Auto</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Chart Colors</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-4 h-4 bg-green-500 rounded"></div>
                              <span className="text-sm">Profit Color</span>
                            </div>
                            <input type="color" value="#10B981" className="w-full h-8 rounded" />
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-4 h-4 bg-red-500 rounded"></div>
                              <span className="text-sm">Loss Color</span>
                            </div>
                            <input type="color" value="#EF4444" className="w-full h-8 rounded" />
                          </div>
                        </div>
                      </div>

                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
