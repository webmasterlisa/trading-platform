"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface DataPoint {
  time: string
  value: number
}

export default function TradingChart({ symbol = "EUR/USD" }: { symbol?: string }) {
  const [data, setData] = useState<DataPoint[]>([])
  const [isPositive, setIsPositive] = useState(true)

  useEffect(() => {
    // Generate mock data
    const generateData = () => {
      const points: DataPoint[] = []
      let baseValue = 1.1725

      for (let i = 0; i < 50; i++) {
        const change = (Math.random() - 0.5) * 0.001
        baseValue += change
        points.push({
          time: new Date(Date.now() - (49 - i) * 60000).toLocaleTimeString(),
          value: baseValue,
        })
      }

      setData(points)
      setIsPositive(points[points.length - 1].value > points[0].value)
    }

    generateData()
    const interval = setInterval(generateData, 5000)

    return () => clearInterval(interval)
  }, [])

  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
        <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          <span className="text-sm font-medium">
            {isPositive ? "+" : ""}
            {((data[data.length - 1]?.value - data[0]?.value) * 10000).toFixed(1)} pips
          </span>
        </div>
      </div>

      <div className="h-32 relative">
        <svg className="w-full h-full" viewBox="0 0 400 100">
          <defs>
            <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0" />
            </linearGradient>
          </defs>

          {data.length > 1 && (
            <>
              <path
                d={`M ${data
                  .map(
                    (point, index) =>
                      `${(index / (data.length - 1)) * 400},${100 - ((point.value - minValue) / range) * 100}`,
                  )
                  .join(" L ")}`}
                fill="none"
                stroke={isPositive ? "#10B981" : "#EF4444"}
                strokeWidth="2"
                className="animate-fadeInUp"
              />
              <path
                d={`M ${data
                  .map(
                    (point, index) =>
                      `${(index / (data.length - 1)) * 400},${100 - ((point.value - minValue) / range) * 100}`,
                  )
                  .join(" L ")} L 400,100 L 0,100 Z`}
                fill={`url(#gradient-${symbol})`}
                className="animate-fadeInUp"
              />
            </>
          )}
        </svg>
      </div>

      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gray-900">{data[data.length - 1]?.value.toFixed(5) || "1.17250"}</div>
        <div className="text-sm text-gray-500">Current Price</div>
      </div>
    </div>
  )
}
