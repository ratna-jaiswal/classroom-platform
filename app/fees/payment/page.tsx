"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import PaymentForm from "@/components/payment-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, CreditCard, Calendar, Receipt, DollarSign } from "lucide-react"

interface PaymentResult {
  success: boolean
  transactionId?: string
  message: string
  status: 'success' | 'failed' | 'invalid_card' | 'insufficient_funds' | 'expired_card' | 'network_error'
}

interface FeeInstallment {
  id: string
  name: string
  amount: number
  dueDate: string
  status: 'Paid' | 'Pending'
  paidDate?: string | null
}

// Sample installment data - in a real app, this would come from an API
const feeInstallments: FeeInstallment[] = [
  {
    id: "1",
    name: "First Installment",
    amount: 40000,
    dueDate: "2024-01-15",
    status: "Paid",
    paidDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Second Installment",
    amount: 40000,
    dueDate: "2024-06-15",
    status: "Paid",
    paidDate: "2024-06-10",
  },
  {
    id: "3",
    name: "Third Installment",
    amount: 40000,
    dueDate: "2024-03-15",
    status: "Pending",
    paidDate: null,
  },
]

function PaymentPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [customPaymentAmount, setCustomPaymentAmount] = useState<string>('')
  const [showAmountInput, setShowAmountInput] = useState(false)

  // Get payment details from URL parameters
  const installmentId = searchParams.get('installment')
  const customAmount = searchParams.get('amount')

  useEffect(() => {
    const type = localStorage.getItem("userType")
    if (type !== "student") {
      router.push("/")
      return
    }
    setUserType(type)

    // Show amount input if no specific amount or installment is provided
    const shouldShowAmountInput = !installmentId && !customAmount
    setShowAmountInput(shouldShowAmountInput)
    
    // Set initial custom amount if provided in URL
    if (customAmount) {
      setCustomPaymentAmount(customAmount)
    }
  }, [router, installmentId, customAmount])

  if (!userType) {
    return <div>Loading...</div>
  }

  // Find the installment details
  const installment = installmentId 
    ? feeInstallments.find(inst => inst.id === installmentId)
    : null

  // Determine payment amount
  const getPaymentAmount = () => {
    if (installment) return installment.amount
    if (customAmount) return parseInt(customAmount)
    if (customPaymentAmount) return parseInt(customPaymentAmount)
    return 1000 // Default minimum amount
  }

  const paymentAmount = getPaymentAmount()

  // Validate custom amount
  const isValidCustomAmount = () => {
    const amount = parseInt(customPaymentAmount)
    return amount >= 100 && amount <= 500000 // Min ₹100, Max ₹5,00,000
  }

  const handlePaymentComplete = (result: PaymentResult) => {
    setPaymentResult(result)
    setPaymentCompleted(true)
    
    // In a real application, you would make an API call here to update the payment status
    if (result.success && installment) {
      // Update installment status (simulated)
      console.log(`Payment successful for installment ${installment.id}`)
    }
  }

  const handleBackToFees = () => {
    router.push('/fees')
  }

  const handleMakeAnotherPayment = () => {
    setPaymentCompleted(false)
    setPaymentResult(null)
  }

  if (paymentCompleted && paymentResult?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation userType="student" />
        
        <div className="lg:ml-80 p-4 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Your fee payment has been processed successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Details */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Amount Paid:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{paymentAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  {installment && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">For:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {installment.name}
                      </span>
                    </div>
                  )}
                  
                  {paymentResult.transactionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {paymentResult.transactionId}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Completed
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleBackToFees}
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Fees
                  </Button>
                  
                  <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Print Receipt
                  </Button>
                  
                  <Button
                    onClick={handleMakeAnotherPayment}
                    className="flex-1"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Make Another Payment
                  </Button>
                </div>

                {/* Receipt Note */}
                <Alert>
                  <Receipt className="h-4 w-4" />
                  <AlertDescription>
                    A payment confirmation email has been sent to your registered email address. 
                    Please save this transaction ID for your records.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation userType="student" />
      
      <div className="lg:ml-80 p-4 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={handleBackToFees}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Fees
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Fee Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your fee payment securely using your credit or debit card.
          </p>
        </div>

        {/* Payment Context Info */}
        {installment && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Installment</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{installment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{installment.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ₹{installment.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Custom Amount Input */}
        {showAmountInput && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <DollarSign className="h-5 w-5" />
                Enter Payment Amount
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter the amount you want to pay (₹100 - ₹5,00,000)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customAmount" className="text-gray-700 dark:text-gray-300">
                    Payment Amount (₹)
                  </Label>
                  <div className="relative">
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="Enter amount (e.g., 25000)"
                      value={customPaymentAmount}
                      onChange={(e) => setCustomPaymentAmount(e.target.value)}
                      className={`pl-8 ${
                        customPaymentAmount && !isValidCustomAmount() 
                          ? 'border-red-500' 
                          : customPaymentAmount && isValidCustomAmount()
                          ? 'border-green-500'
                          : ''
                      }`}
                      min="100"
                      max="500000"
                    />
                    <DollarSign className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  
                  {customPaymentAmount && !isValidCustomAmount() && (
                    <p className="text-sm text-red-500">
                      Amount must be between ₹100 and ₹5,00,000
                    </p>
                  )}
                  
                  {customPaymentAmount && isValidCustomAmount() && (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        Amount to Pay:
                      </span>
                      <span className="text-lg font-bold text-green-900 dark:text-green-100">
                        ₹{parseInt(customPaymentAmount).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Quick Select:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {[1000, 5000, 10000, 20000, 40000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomPaymentAmount(amount.toString())}
                        className="hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20"
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Show Payment Form only if amount is valid or pre-defined */}
        {(!showAmountInput || (showAmountInput && customPaymentAmount && isValidCustomAmount())) && (
          <PaymentForm
            amount={paymentAmount}
            installmentId={installmentId || undefined}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {/* Show message if custom amount is required but not entered */}
        {showAmountInput && (!customPaymentAmount || !isValidCustomAmount()) && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Enter Payment Amount
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please enter a valid amount between ₹100 and ₹5,00,000 to proceed with the payment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Failed Result */}
        {paymentCompleted && paymentResult && !paymentResult.success && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mt-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertDescription>
                    {paymentResult.message}
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={handleMakeAnotherPayment}
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Try Again
                  </Button>
                  
                  <Button
                    onClick={handleBackToFees}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Fees
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  )
}