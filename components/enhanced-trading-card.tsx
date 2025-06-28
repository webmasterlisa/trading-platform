import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EnhancedTradingCardProps {
  symbol: string
  name: string
  price: string
  change: string
  changePercent: string
  icon: string
  isPositive: boolean
}

export default function EnhancedTradingCard({
  symbol,
  name,
  price,
  changePercent,
  icon,
  isPositive,
}: EnhancedTradingCardProps) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white card-hover group">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-xl mb-1">{symbol}</h3>
            <p className="text-gray-600 text-sm">{name}</p>
          </div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-200">{icon}</div>
        </div>

        {/* Mini Chart */}
        <div className="h-16 mb-4 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 60">
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
                <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sample chart path */}
            <path
              d={isPositive ? "M0,40 Q50,20 100,25 T200,15" : "M0,20 Q50,40 100,35 T200,45"}
              fill="none"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth="2"
              className="animate-fadeInUp"
            />
            <path
              d={
                isPositive
                  ? "M0,40 Q50,20 100,25 T200,15 L200,60 L0,60 Z"
                  : "M0,20 Q50,40 100,35 T200,45 L200,60 L0,60 Z"
              }
              fill={`url(#gradient-${symbol})`}
              className="animate-fadeInUp"
            />
          </svg>
        </div>

        <div className="text-center mb-4">
          <div className="text-2xl font-bold mb-2">{price}</div>
          <div
            className={`flex items-center justify-center text-sm ${isPositive ? "text-orange-500" : "text-red-500"}`}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${isPositive ? "bg-orange-500" : "bg-red-500"}`}></span>
            {changePercent}
          </div>
        </div>

        <Button className="w-full bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-800 font-medium transition-all duration-200 group-hover:bg-orange-500 group-hover:text-white">
          TRADE NOW
        </Button>
      </CardContent>
    </Card>
  )
}
