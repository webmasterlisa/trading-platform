"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-80 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Chat</h3>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">Hello! How can we help you today?</p>
            </div>
            <div className="flex space-x-2">
              <input type="text" placeholder="Type your message..." className="flex-1 p-2 border rounded-lg text-sm" />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
