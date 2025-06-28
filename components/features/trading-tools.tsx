"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Shield, Zap, Globe, Users } from "lucide-react"

export default function TradingTools() {
  const tools = [
    {
      icon: BarChart3,
      title: "Advanced Charts",
      description: "Professional trading charts with 100+ indicators",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time market insights and trading signals",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced risk management tools and stop-loss orders",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Zap,
      title: "Fast Execution",
      description: "Lightning-fast order execution with minimal slippage",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access to forex, commodities, indices, and crypto",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Copy Trading",
      description: "Follow and copy successful traders automatically",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Trading Tools</h2>
          <p className="text-xl text-gray-600">Everything you need to trade like a pro</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Card
                key={tool.title}
                className="card-hover animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-full ${tool.bgColor} mb-6`}>
                    <Icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{tool.title}</h3>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  <Button
                    variant="outline"
                    className="hover:bg-orange-500 hover:text-white hover:border-orange-500 bg-transparent"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
