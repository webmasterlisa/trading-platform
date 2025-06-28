import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PlansPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for beginners",
      features: ["Demo account", "Basic trading tools", "Email support", "Educational resources", "Mobile app access"],
      popular: false,
    },
    {
      name: "Professional",
      price: "$29/month",
      description: "For serious traders",
      features: [
        "All Starter features",
        "Advanced charting tools",
        "Priority support",
        "Market analysis",
        "API access",
        "Lower spreads",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$99/month",
      description: "For institutional traders",
      features: [
        "All Professional features",
        "Dedicated account manager",
        "Custom trading solutions",
        "Institutional spreads",
        "Advanced risk management",
        "White-label solutions",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Choose Your Trading Plan</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Select the plan that best fits your trading needs and experience level
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative shadow-lg ${plan.popular ? "ring-2 ring-orange-500" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-orange-500 mb-2">{plan.price}</div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-full font-medium ${
                      plan.popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border border-orange-500 text-orange-500 hover:bg-orange-50"
                    }`}
                  >
                    {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">All Plans Include</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-bold">Secure Trading</h4>
                <p className="text-sm text-gray-600">Bank-level security</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-bold">Mobile App</h4>
                <p className="text-sm text-gray-600">Trade on the go</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold">Real-time Data</h4>
                <p className="text-sm text-gray-600">Live market feeds</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="font-bold">Education</h4>
                <p className="text-sm text-gray-600">Learning resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
