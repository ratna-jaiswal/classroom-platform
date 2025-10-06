"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PaymentMethodSelector from "@/components/ui/payment-method-selector"
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock,
  Shield,
  DollarSign,
  ArrowLeft
} from "lucide-react"

// Validation schema for payment form
const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number is too long")
    .regex(/^[\d\s]+$/, "Card number can only contain digits and spaces"),
  expiryMonth: z.string().min(1, "Month is required"),
  expiryYear: z.string().min(1, "Year is required"),
  cvv: z.string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot be more than 4 digits")
    .regex(/^\d+$/, "CVV can only contain digits"),
  cardHolderName: z.string()
    .min(2, "Cardholder name must be at least 2 characters")
    .max(50, "Cardholder name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Cardholder name can only contain letters and spaces"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  installmentId: z.string().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  amount: number
  installmentId?: string
  onPaymentComplete?: (result: PaymentResult) => void
}

interface PaymentResult {
  success: boolean
  transactionId?: string
  message: string
  status: 'success' | 'failed' | 'invalid_card' | 'insufficient_funds' | 'expired_card' | 'network_error'
}

// Test card scenarios
const TEST_CARDS = {
  VALID: {
    number: "4111111111111111",
    name: "Valid Card",
    description: "Payment will succeed"
  },
  INVALID: {
    number: "4000000000000002",
    name: "Invalid Card",
    description: "Card will be declined"
  },
  INSUFFICIENT_FUNDS: {
    number: "4000000000009995",
    name: "Insufficient Funds",
    description: "Payment will fail due to insufficient funds"
  },
  EXPIRED: {
    number: "4000000000000069",
    name: "Expired Card",
    description: "Card has expired"
  },
  NETWORK_ERROR: {
    number: "4000000000000119",
    name: "Network Error",
    description: "Network timeout simulation"
  },
  PROCESSING_ERROR: {
    number: "4000000000000127",
    name: "Processing Error",
    description: "Generic processing error"
  }
}

export default function PaymentForm({ amount, installmentId, onPaymentComplete }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [showTestCards, setShowTestCards] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet' | null>(null)
  const [showMethodSelection, setShowMethodSelection] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount,
      installmentId,
    },
  })

  const watchedCardNumber = watch("cardNumber")

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: 'card' | 'upi' | 'netbanking' | 'wallet') => {
    setSelectedPaymentMethod(method)
    setShowMethodSelection(false)
    setPaymentResult(null) // Clear any previous results
  }

  // Handle back to method selection
  const handleBackToMethodSelection = () => {
    setShowMethodSelection(true)
    setSelectedPaymentMethod(null)
    setPaymentResult(null)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  // Detect card type
  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "")
    if (cleaned.startsWith("4")) return "visa"
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard"
    if (cleaned.startsWith("3")) return "amex"
    return "unknown"
  }

  // Process payment via API
  const processPayment = async (data: PaymentFormData): Promise<PaymentResult> => {
    try {
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          message: errorData.message || 'Payment processing failed',
          status: errorData.status || 'failed'
        }
      }

      const result = await response.json()
      return {
        success: result.success,
        transactionId: result.transactionId,
        message: result.message,
        status: result.status
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
        status: 'network_error'
      }
    }
  }

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)
    setPaymentResult(null)

    try {
      const result = await processPayment(data)
      setPaymentResult(result)
      onPaymentComplete?.(result)
    } catch (error) {
      setPaymentResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
        status: 'failed'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const useTestCard = (cardNumber: string) => {
    setValue("cardNumber", formatCardNumber(cardNumber))
    setValue("cardHolderName", "Test User")
    setValue("expiryMonth", "12")
    setValue("expiryYear", "2028")
    setValue("cvv", "123")
    setShowTestCards(false)
  }

  const getResultIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'failed':
      case 'invalid_card':
      case 'insufficient_funds':
      case 'expired_card':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'network_error':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-blue-500" />
    }
  }

  const getResultColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
      case 'failed':
      case 'invalid_card':
      case 'insufficient_funds':
      case 'expired_card':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
      case 'network_error':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Payment Amount Summary */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <DollarSign className="h-5 w-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-2xl font-bold">
            <span className="text-gray-700 dark:text-gray-300">Amount to Pay:</span>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ₹{amount.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      {showMethodSelection && (
        <PaymentMethodSelector
          selectedMethod={selectedPaymentMethod}
          onMethodSelect={handlePaymentMethodSelect}
          amount={amount}
        />
      )}

      {/* Back to Method Selection Button */}
      {!showMethodSelection && selectedPaymentMethod && (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={handleBackToMethodSelection}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Change Payment Method
          </Button>
        </div>
      )}

      {/* Method-Specific Forms */}
      {!showMethodSelection && selectedPaymentMethod === 'card' && (
        <>
          {/* Test Cards Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 dark:text-white">Test Cards</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTestCards(!showTestCards)}
                >
                  {showTestCards ? "Hide" : "Show"} Test Cards
                </Button>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Use these test card numbers to simulate different payment scenarios
              </CardDescription>
            </CardHeader>
            {showTestCards && (
              <CardContent>
                <div className="grid gap-3">
                  {Object.entries(TEST_CARDS).map(([key, card]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-700/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600/30 transition-colors"
                      onClick={() => useTestCard(card.number)}
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{card.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-500">{card.number}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Use Card
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Card Payment Form */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <CreditCard className="h-5 w-5" />
                Card Payment Details
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter your card information to complete the payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">
                    Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      {...register("cardNumber")}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        setValue("cardNumber", formatted)
                      }}
                      className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                      maxLength={19}
                    />
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    {watchedCardNumber && (
                      <div className="absolute right-3 top-3">
                        <Badge variant="outline" className="text-xs">
                          {getCardType(watchedCardNumber).toUpperCase()}
                        </Badge>
                      </div>
                    )}
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth" className="text-gray-700 dark:text-gray-300">
                      Month
                    </Label>
                    <Select onValueChange={(value) => setValue("expiryMonth", value)}>
                      <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expiryMonth && (
                      <p className="text-sm text-red-500">{errors.expiryMonth.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryYear" className="text-gray-700 dark:text-gray-300">
                      Year
                    </Label>
                    <Select onValueChange={(value) => setValue("expiryYear", value)}>
                      <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.expiryYear && (
                      <p className="text-sm text-red-500">{errors.expiryYear.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-gray-700 dark:text-gray-300">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      {...register("cvv")}
                      className={errors.cvv ? 'border-red-500' : ''}
                      maxLength={4}
                    />
                    {errors.cvv && (
                      <p className="text-sm text-red-500">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                  <Label htmlFor="cardHolderName" className="text-gray-700 dark:text-gray-300">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardHolderName"
                    placeholder="John Doe"
                    {...register("cardHolderName")}
                    className={errors.cardHolderName ? 'border-red-500' : ''}
                  />
                  {errors.cardHolderName && (
                    <p className="text-sm text-red-500">{errors.cardHolderName.message}</p>
                  )}
                </div>

                <Separator />

                {/* Security Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Pay ₹{amount.toLocaleString()}
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}

      {/* Other Payment Methods Placeholder */}
      {!showMethodSelection && selectedPaymentMethod && selectedPaymentMethod !== 'card' && (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {selectedPaymentMethod?.toUpperCase()} Payment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This payment method is coming soon! For now, please use card payment.
              </p>
              <Button
                onClick={handleBackToMethodSelection}
                variant="outline"
              >
                Choose Different Method
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Result */}
      {paymentResult && (
        <Alert className={getResultColor(paymentResult.status)}>
          <div className="flex items-center gap-2">
            {getResultIcon(paymentResult.status)}
            <AlertDescription className="flex-1">
              <div>
                <p className="font-medium">{paymentResult.message}</p>
                {paymentResult.transactionId && (
                  <p className="text-sm mt-1">Transaction ID: {paymentResult.transactionId}</p>
                )}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  )
}