import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import EnhancedTradingCard from "@/components/enhanced-trading-card"
import MarketOverview from "@/components/features/market-overview"
import TradingTools from "@/components/features/trading-tools"
import Testimonials from "@/components/features/testimonials"
import CTASection from "@/components/features/cta-section"
import { Button } from "@/components/ui/button"

// Add these imports at the top
import StatsSection from "@/components/features/stats-section"
import Footer from "@/components/features/footer"

export default function HomePage() {
  const tradingCards = [
    {
      symbol: "GBPUSD",
      name: "Pound/Dollar",
      price: "$3500.98",
      change: "1.68",
      changePercent: "(0.66%)",
      icon: "🇬🇧🇺🇸",
      isPositive: true,
    },
    {
      symbol: "Gold",
      name: "Gold",
      price: "$5000.33",
      change: "1.68",
      changePercent: "(0.66%)",
      icon: "🥇",
      isPositive: true,
    },
    {
      symbol: "EUSTX50",
      name: "Euro Stoxx 50",
      price: "$10,000.15",
      change: "-31.15",
      changePercent: "(-0.44%)",
      icon: "🇪🇺",
      isPositive: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <TickerTape />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">TRADE WISELY</h1>
              <h2 className="text-4xl font-light text-gray-800 mb-8 leading-tight">
                Choose from <span className="font-bold">5000s</span> of{" "}
                <span className="text-orange-500 font-bold">Commodities</span>
              </h2>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium mb-4 transition-all duration-200 hover:scale-105">
                CREATE ACCOUNT →
              </Button>
              <p className="text-gray-600 text-sm">To start earning</p>
            </div>

            <div className="grid gap-6 animate-slideInRight">
              {tradingCards.map((card, index) => (
                <div key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                  <EnhancedTradingCard {...card} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-12 space-x-2 animate-fadeInUp" style={{ animationDelay: "0.8s" }}>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Wavy background */}
        <div className="absolute bottom-0 left-0 w-full h-64 z-0">
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              fill="url(#waveGradient)"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <MarketOverview />
        </div>
      </section>

      {/* Trading Tools */}
      <TradingTools />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />

      {/* Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />

      {/* Disclaimer */}
      <div className="fixed top-1/2 right-4 text-xs text-gray-400 transform rotate-90 origin-center z-20">
        Trading involves significant risk. Always massive profits.
      </div>

      {/* Telegram Chat Widget */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.56c-.12.56-.44.7-.9.44l-2.48-1.83-1.2 1.15c-.13.13-.24.24-.5.24l.18-2.51 4.62-4.18c.2-.18-.04-.28-.32-.1L9.74 11.9l-2.44-.76c-.53-.17-.54-.53.11-.78l9.52-3.67c.44-.17.83.11.69.78z" />
          </svg>
        </Button>
      </div>

      <ChatWidget />
    </div>
  )
}
