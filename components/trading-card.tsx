import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface TradingCardProps {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  icon: string
  isPositive: boolean
}

export default function TradingCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  icon,
  isPositive,
}: TradingCardProps) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow bg-white">
      <CardContent className="p-0">
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl mb-1">{symbol}</h3>
          <p className="text-gray-600 text-sm">{name}</p>
        </div>

        <div className="flex justify-center mb-4">
          <div className="text-4xl">{icon}</div>
        </div>

        <div className="h-16 flex items-center justify-center mb-4">
          <TrendingUp className={`w-full h-12 ${isPositive ? "text-green-400" : "text-red-400"}`} />
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold mb-1">{price}</div>
          <div className={`text-sm ${isPositive ? "text-orange-500" : "text-red-500"}`}>
            {isPositive ? "●" : "●"} {change} {changePercent}
          </div>
        </div>

        <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">TRADE NOW</Button>
      </CardContent>
    </Card>
  )
}
