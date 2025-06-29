"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, Activity, Settings, Eye, Edit, Plus, Check, X, AlertCircle } from "lucide-react"

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  username?: string
  phone?: string
  country?: string
  account_type: "demo" | "live"
  balance: number
  demo_balance: number
  is_verified: boolean
  is_admin: boolean
  created_at: string
}

interface Transaction {
  id: number
  user_id: number
  type: string
  amount: number
  currency: string
  status: string
  payment_method?: string
  description?: string
  created_at: string
  email: string
  first_name: string
  last_name: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [adminNote, setAdminNote] = useState("")

  useEffect(() => {
    fetchUsers()
    fetchTransactions()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      if (response.ok) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/admin/transactions")
      const data = await response.json()
      if (response.ok) {
        setTransactions(data.transactions)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (userId: number, updates: Partial<User>) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, updates }),
      })

      if (response.ok) {
        fetchUsers()
        setShowUserModal(false)
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const updateUserBalance = async (userId: number, balance: number, demoBalance: number, reason: string) => {
    try {
      const response = await fetch("/api/admin/users/balance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, balance, demoBalance, reason }),
      })

      if (response.ok) {
        fetchUsers()
        fetchTransactions()
        setShowUserModal(false)
        alert("Balance updated successfully!")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error updating user balance:", error)
      alert("Error updating balance")
    }
  }

  const approveTransaction = async (transactionId: number, action: "approve" | "decline") => {
    try {
      const response = await fetch("/api/admin/transactions/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, action, adminNote }),
      })

      if (response.ok) {
        fetchTransactions()
        fetchUsers()
        setShowTransactionModal(false)
        setSelectedTransaction(null)
        setAdminNote("")
        alert(`Transaction ${action}d successfully!`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error processing transaction:", error)
      alert("Error processing transaction")
    }
  }

  const createTransaction = async (transactionData: {
    user_id: number
    type: string
    amount: number
    currency: string
    payment_method: string
    description: string
  }) => {
    try {
      const response = await fetch("/api/admin/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      })

      if (response.ok) {
        fetchTransactions()
        fetchUsers()
      }
    } catch (error) {
      console.error("Error creating transaction:", error)
    }
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Balance",
      value: `$${users.reduce((sum, user) => sum + user.balance, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Transactions",
      value: transactions.filter(t => t.status === "pending").length,
      icon: Activity,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Verified Users",
      value: users.filter((user) => user.is_verified).length,
      icon: Settings,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage users, transactions, and system settings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">User Management</h3>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">User</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Account Type</th>
                        <th className="text-left p-3">Balance</th>
                        <th className="text-left p-3">Demo Balance</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-gray-500 text-xs">ID: {user.id}</div>
                            </div>
                          </td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.account_type === "live"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {user.account_type.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">${user.balance.toLocaleString()}</td>
                          <td className="p-3">${user.demo_balance.toLocaleString()}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.is_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {user.is_verified ? "Verified" : "Pending"}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setShowUserModal(true)
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Recent Transactions</h3>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">User</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-left p-3">Amount</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <div className="font-medium">
                                {transaction.first_name} {transaction.last_name}
                              </div>
                              <div className="text-gray-500 text-xs">{transaction.email}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.type === "deposit"
                                  ? "bg-green-100 text-green-700"
                                  : transaction.type === "withdrawal"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {transaction.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">${transaction.amount.toLocaleString()}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : transaction.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3">{new Date(transaction.created_at).toLocaleDateString()}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedTransaction(transaction)
                                  setShowTransactionModal(true)
                                }}
                              >
                              <Eye className="w-4 h-4" />
                            </Button>
                              {transaction.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => approveTransaction(transaction.id, "approve")}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => approveTransaction(transaction.id, "decline")}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6">System Settings</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                      <input
                        type="text"
                        defaultValue="MexoHub"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Deposit</label>
                      <input
                        type="number"
                        defaultValue="10"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Withdrawal</label>
                      <input
                        type="number"
                        defaultValue="50000"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Demo Balance</label>
                      <input
                        type="number"
                        defaultValue="50000"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Maintenance Mode</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Allow New Registrations</span>
                    </label>
                  </div>

                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Edit Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">
                  Edit User: {selectedUser.first_name} {selectedUser.last_name}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live Balance</label>
                    <input
                      type="number"
                      defaultValue={selectedUser.balance}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      id="balance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Demo Balance</label>
                    <input
                      type="number"
                      defaultValue={selectedUser.demo_balance}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      id="demo_balance"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <select
                      defaultValue={selectedUser.account_type}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      id="account_type"
                    >
                      <option value="demo">Demo</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser.is_verified}
                      className="mr-2"
                      id="is_verified"
                    />
                    <label className="text-sm">Verified Account</label>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button
                    onClick={() => {
                      const balance = Number.parseFloat((document.getElementById("balance") as HTMLInputElement).value)
                      const demoBalance = Number.parseFloat((document.getElementById("demo_balance") as HTMLInputElement).value)
                      const account_type = (document.getElementById("account_type") as HTMLSelectElement).value
                      const is_verified = (document.getElementById("is_verified") as HTMLInputElement).checked

                      updateUserBalance(selectedUser.id, balance, demoBalance, "Balance adjustment by admin")
                      updateUser(selectedUser.id, {
                        account_type: account_type as "demo" | "live",
                        is_verified,
                      })
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setShowUserModal(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Transaction Modal */}
        {showTransactionModal && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Transaction Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                    <p className="text-gray-900">{selectedTransaction.first_name} {selectedTransaction.last_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <p className="text-gray-900">{selectedTransaction.type.toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <p className="text-gray-900">${selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <p className="text-gray-900">{selectedTransaction.status.toUpperCase()}</p>
                  </div>
                  {selectedTransaction.status === "pending" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Admin Note (Optional)</label>
                      <textarea
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Add a note about this transaction..."
                        rows={3}
                      />
                    </div>
                  )}
                </div>
                <div className="flex space-x-3 mt-6">
                  {selectedTransaction.status === "pending" && (
                    <>
                      <Button
                        onClick={() => approveTransaction(selectedTransaction.id, "approve")}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => approveTransaction(selectedTransaction.id, "decline")}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </>
                  )}
                  <Button variant="outline" onClick={() => {
                    setShowTransactionModal(false)
                    setSelectedTransaction(null)
                    setAdminNote("")
                  }}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
