import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">About MexoHub</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              MexoHub is a leading online trading platform that provides access to global financial markets with
              cutting-edge technology and competitive pricing.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-orange-500">Our Mission</h3>
                <p className="text-gray-700">
                  To democratize trading by providing retail investors with institutional-grade tools and market access
                  at affordable prices.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-orange-500">Our Vision</h3>
                <p className="text-gray-700">
                  To become the world's most trusted and innovative trading platform, empowering millions of traders
                  globally.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Why Choose MexoHub?</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🛡️</div>
                <h4 className="text-xl font-bold mb-2">Secure Trading</h4>
                <p className="text-gray-600">Bank-level security with advanced encryption</p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-bold mb-2">Fast Execution</h4>
                <p className="text-gray-600">Lightning-fast order execution with minimal slippage</p>
              </div>

              <div className="text-center p-6">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="text-xl font-bold mb-2">Advanced Tools</h4>
                <p className="text-gray-600">Professional trading tools and real-time analytics</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-gray-700 mb-8">
              Our team consists of experienced financial professionals, technology experts, and customer service
              specialists dedicated to providing the best trading experience possible.
            </p>

            <div className="bg-orange-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
              <p className="text-gray-700 mb-4">Join thousands of traders who trust MexoHub for their trading needs.</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
