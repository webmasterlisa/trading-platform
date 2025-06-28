"use client"

export default function TickerTape() {
  const tickerData = [
    { symbol: "S&P 500", price: "6,162.2", change: "+18.1", percent: "(+0.29%)", positive: true, icon: "🔴" },
    { symbol: "Nasdaq 100", price: "22,519.3", change: "+68.80", percent: "(+0.31%)", positive: true, icon: "🔵" },
    { symbol: "EUR/USD", price: "1.17283", change: "+0.00", percent: "(+0.28%)", positive: true, icon: "🇪🇺🇺🇸" },
    { symbol: "BTC/USD", price: "106,484", change: "-620.00", percent: "(-0.49%)", positive: false, icon: "🟠" },
    { symbol: "ETH/USD", price: "2,418.4", change: "+1.10", percent: "(+0.05%)", positive: true, icon: "🔵" },
    { symbol: "S&P 5 W", price: "6,162.2", change: "+18.1", percent: "(+0.29%)", positive: true, icon: "🔴" },
  ]

  return (
    <div className="bg-white border-b border-gray-200 py-2 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={index} className="flex items-center mx-6 text-sm">
            <span className="w-4 h-4 mr-2 text-xs">{item.icon}</span>
            <span className="font-medium mr-2 text-gray-900">{item.symbol}</span>
            <span className="mr-2 text-gray-900">{item.price}</span>
            <span className={`mr-1 ${item.positive ? "text-green-500" : "text-red-500"}`}>{item.change}</span>
            <span className={item.positive ? "text-green-500" : "text-red-500"}>{item.percent}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-gray-400 mt-1">Ticker Tape by TradingView</div>
    </div>
  )
}
