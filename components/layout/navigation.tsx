"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, User } from "lucide-react"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="flex items-center">
        <div className="text-2xl font-bold">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-l">m</span>
          <span className="bg-orange-400 text-white px-2 py-1">x</span>
          <span className="bg-orange-300 text-white px-2 py-1 rounded-r">o</span>
          <span className="ml-2 text-gray-800">mexohub</span>
        </div>
      </Link>

      <div className="flex items-center space-x-8">
        <Link href="/about" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
          <span>About</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/faq" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
          <span>Support (FAQ)</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/plans" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer">
          <span>Pricing</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
        <Link
          href="/support"
          className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 cursor-pointer"
        >
          <span>Contact</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/account">
          <User className="w-6 h-6 text-gray-600 cursor-pointer" />
        </Link>
        <Link href="/login">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">GET STARTED</Button>
        </Link>
      </div>
    </nav>
  )
}
