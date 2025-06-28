import TickerTape from "@/components/layout/ticker-tape"
import Navigation from "@/components/layout/navigation"
import ChatWidget from "@/components/layout/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle, Clock } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <TickerTape />
      <Navigation />

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">Contact Support</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            We're here to help you with any questions or issues you may have
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
                <Button variant="outline" className="border-orange-500 text-orange-500 bg-transparent">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Call us for urgent matters</p>
                <Button variant="outline" className="border-orange-500 text-orange-500 bg-transparent">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>General Inquiry</option>
                    <option>Account Issues</option>
                    <option>Trading Problems</option>
                    <option>Technical Support</option>
                    <option>Billing Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Please describe your issue or question in detail..."
                  ></textarea>
                </div>

                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-orange-500 mr-3" />
                <h3 className="text-xl font-bold">Support Hours</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Live Chat & Phone</h4>
                  <p className="text-gray-600">Monday - Friday: 24/7</p>
                  <p className="text-gray-600">Weekend: 9 AM - 6 PM EST</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Email Support</h4>
                  <p className="text-gray-600">24/7 - We respond within 24 hours</p>
                  <p className="text-gray-600">Priority support for premium users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChatWidget />
    </div>
  )
}
