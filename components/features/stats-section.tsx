"use client"

import { useEffect, useState } from "react"
import AnimatedCounter from "@/components/dashboard/animated-counter"
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, Globe, TrendingUp } from "lucide-react"

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: Users,
      value: 150000,
      suffix: "+",
      label: "Active Traders",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: DollarSign,
      value: 2.5,
      suffix: "B+",
      label: "Trading Volume",
      color: "text-green-500",
      bgColor: "bg-green-50",
      decimals: 1,
    },
    {
      icon: Globe,
      value: 195,
      suffix: "",
      label: "Countries Served",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      decimals: 0,
    },
    {
      icon: TrendingUp,
      value: 99.9,
      suffix: "%",
      label: "Uptime",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      decimals: 1,
    },
  ]

  return (
    <section id="stats-section" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Traders Worldwide</h2>
          <p className="text-xl text-gray-600">Join the global trading community</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="text-center card-hover animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-4`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {isVisible ? (
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                        duration={2000}
                      />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
