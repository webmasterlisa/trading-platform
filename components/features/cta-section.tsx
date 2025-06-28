"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react"

export default function CTASection() {
  const features = [
    { icon: Shield, text: "Regulated & Secure" },
    { icon: Zap, text: "Fast Execution" },
    { icon: TrendingUp, text: "Advanced Tools" },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-fadeInUp">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">Join over 100,000 traders worldwide</p>

          <div className="flex justify-center items-center space-x-8 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.text}
                  className="flex items-center animate-slideInUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon className="w-6 h-6 mr-2" />
                  <span className="text-lg">{feature.text}</span>
                </div>
              )
            })}
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 text-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 text-lg font-medium bg-transparent"
            >
              Try Demo Account
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">No minimum deposit • Start with $10</p>
        </div>
      </div>
    </section>
  )
}
