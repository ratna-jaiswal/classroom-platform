"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Calendar, AlertTriangle, CreditCard, Download, Receipt } from "lucide-react"

export default function FeesPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (type !== "student") {
      router.push("/")
      return
    }
    setUserType(type)
  }, [router])

  if (!userType) {
    return <div>Loading...</div>
  }

  const feeStructure = {
    totalAnnualFee: 120000,
    paidAmount: 80000,
    pendingAmount: 40000,
    nextDueDate: "2024-03-15",
    installments: [
      {
        id: 1,
        name: "First Installment",
        amount: 40000,
        dueDate: "2024-01-15",
        status: "Paid",
        paidDate: "2024-01-10",
      },
      {
        id: 2,
        name: "Second Installment",
        amount: 40000,
        dueDate: "2024-06-15",
        status: "Paid",
        paidDate: "2024-06-10",
      },
      { id: 3, name: "Third Installment", amount: 40000, dueDate: "2024-03-15", status: "Pending", paidDate: null },
    ],
  }

  const feeBreakdown = [
    { category: "Tuition Fee", amount: 80000 },
    { category: "Lab Fee", amount: 15000 },
    { category: "Library Fee", amount: 5000 },
    { category: "Sports Fee", amount: 8000 },
    { category: "Development Fee", amount: 12000 },
  ]

  const paymentHistory = [
    {
      id: 1,
      date: "2024-01-10",
      amount: 40000,
      method: "Online Payment",
      transactionId: "TXN123456789",
      status: "Success",
      receipt: "RCP001",
    },
    {
      id: 2,
      date: "2024-06-10",
      amount: 40000,
      method: "Bank Transfer",
      transactionId: "TXN987654321",
      status: "Success",
      receipt: "RCP002",
    },
  ]

  const paymentPercentage = (feeStructure.paidAmount / feeStructure.totalAnnualFee) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />

      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Fee Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Track your fee payments and manage dues.</p>
        </div>

        {/* Fee Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Annual Fee</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{feeStructure.totalAnnualFee.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{feeStructure.paidAmount.toLocaleString()}
              </div>
              <Progress value={paymentPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">{paymentPercentage.toFixed(1)}% completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Amount</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ₹{feeStructure.pendingAmount.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Due Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{feeStructure.nextDueDate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Due Alert */}
        {feeStructure.pendingAmount > 0 && (
          <Alert className="mb-6 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-red-800 dark:text-red-300">
                You have a pending fee of ₹{feeStructure.pendingAmount.toLocaleString()} due by {feeStructure.nextDueDate}
                . Please make the payment to avoid late fees.
              </span>
              <Button 
                variant="default" 
                size="sm"
                onClick={() => router.push(`/fees/payment?amount=${feeStructure.pendingAmount}`)}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Pay Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fee Breakdown */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Fee Breakdown</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Detailed breakdown of your annual fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                    <span className="text-sm text-gray-900 dark:text-white">₹{item.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{feeStructure.totalAnnualFee.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installment Status */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Installment Status</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Track your fee installment payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feeStructure.installments.map((installment) => (
                  <div
                    key={installment.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                  >
                    {/* allow main content to shrink and actions to wrap on small screens */}
                    <div className="flex-1 min-w-0">
                       <h4 className="font-medium text-gray-900 dark:text-white">{installment.name}</h4>
                       <p className="text-sm text-gray-600 dark:text-gray-400">
                         Due: {installment.dueDate} • ₹{installment.amount.toLocaleString()}
                       </p>
                       {installment.paidDate && (
                         <p className="text-xs text-green-600 dark:text-green-400">Paid on: {installment.paidDate}</p>
                       )}
                     </div>
                     <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">
                       <Badge variant={installment.status === "Paid" ? "default" : "destructive"}>
                         {installment.status}
                       </Badge>
                       {installment.status === "Pending" && (
                         <Button 
                           size="sm"
                           onClick={() => router.push(`/fees/payment?installment=${installment.id}&amount=${installment.amount}`)}
                         >
                           Pay Now
                         </Button>
                       )}
                     </div>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Payment Section */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <CreditCard className="h-5 w-5" />
              Quick Payment
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Make a payment for any amount or pay your pending dues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {feeStructure.pendingAmount > 0 && (
                <Button 
                  onClick={() => router.push(`/fees/payment?amount=${feeStructure.pendingAmount}`)}
                  className="flex-1"
                >
                  Pay Pending Amount (₹{feeStructure.pendingAmount.toLocaleString()})
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => router.push('/fees/payment')}
                className="flex-1"
              >
                Make Custom Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Payment History</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Your previous fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white">₹{payment.amount.toLocaleString()}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1 flex-wrap">
                      <span className="truncate">{payment.date}</span>
                      <span>•</span>
                      <span className="truncate">{payment.method}</span>
                      <span>•</span>
                      <span className="truncate">ID: {payment.transactionId}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap">
                    <Badge variant="default">{payment.status}</Badge>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Receipt className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
