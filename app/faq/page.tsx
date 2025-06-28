import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click on 'GET STARTED' button and fill out the registration form with your personal details. You'll need to verify your email and complete identity verification.",
    },
    {
      question: "What is the minimum deposit?",
      answer:
        "The minimum deposit is $100 for most account types. Some premium accounts may have higher minimum requirements.",
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals typically take 1-3 business days depending on your payment method. Bank transfers may take longer.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, we use bank-level security and segregate client funds. We're regulated by top-tier financial authorities.",
    },
    {
      question: "What trading instruments are available?",
      answer: "We offer forex, commodities, indices, cryptocurrencies, and stocks from major global exchanges.",
    },
    {
      question: "Do you offer demo accounts?",
      answer: "Yes, we provide free demo accounts with virtual funds so you can practice trading without risk.",
    },
    {
      question: "What are your trading hours?",
      answer: "Forex markets are available 24/5, while other markets follow their respective exchange hours.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team via live chat, email, or phone. We're available 24/7 for urgent matters.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Find answers to common questions about trading with MexoHub
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-orange-500">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help you 24/7</p>
            <div className="space-x-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full">
                Contact Support
              </button>
              <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
