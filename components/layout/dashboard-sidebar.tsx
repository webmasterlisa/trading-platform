"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Wallet,
  CreditCard,
  ArrowUpCircle,
  Activity,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: TrendingUp, label: "Trading", href: "/dashboard/trading" },
  { icon: BarChart3, label: "Portfolio", href: "/dashboard/portfolio" },
  { icon: CreditCard, label: "Deposit", href: "/dashboard/deposit" },
  { icon: ArrowUpCircle, label: "Withdraw", href: "/dashboard/withdraw" },
  { icon: Activity, label: "Transactions", href: "/dashboard/transactions" },
  { icon: PieChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} min-h-screen`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <Link href="/" className="flex items-center animate-slideInLeft">
              <div className="text-2xl font-bold">
                <span className="bg-orange-500 text-white px-2 py-1 rounded-l">m</span>
                <span className="bg-orange-400 text-white px-2 py-1">x</span>
                <span className="bg-orange-300 text-white px-2 py-1 rounded-r">o</span>
              </div>
              <span className="ml-2 text-gray-800 font-bold">mexohub</span>
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-1">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 animate-slideInLeft group ${
                  isActive
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon
                  className={`w-5 h-5 ${isCollapsed ? "mx-auto" : "mr-3"} transition-transform group-hover:scale-110`}
                />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Button
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 ${
              isCollapsed ? "px-2" : "px-3"
            }`}
          >
            <LogOut className={`w-5 h-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
