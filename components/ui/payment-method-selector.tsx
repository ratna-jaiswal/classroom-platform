"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export interface PaymentMethod {
  id: 'card' | 'upi' | 'netbanking' | 'wallet'
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  processing_time: string
  availability: 'available' | 'maintenance' | 'disabled'
}

interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethod['id'] | null
  onMethodSelect: (method: PaymentMethod['id']) => void
  amount: number
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Pay using your Visa, MasterCard, RuPay or American Express',
    icon: CreditCard,
    features: ['Instant Payment', 'Secure', 'Widely Accepted'],
    processing_time: 'Instant',
    availability: 'available'
  },
  {
    id: 'upi',
    name: 'UPI Payment',
    description: 'Pay using GooglePay, PhonePe, Paytm, BHIM or any UPI app',
    icon: Smartphone,
    features: ['0% Fee', 'Instant', 'Most Popular'],
    processing_time: 'Instant',
    availability: 'available'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'Pay directly from your bank account',
    icon: Building2,
    features: ['Direct Bank Transfer', 'Secure', 'No Additional Charges'],
    processing_time: '2-5 minutes',
    availability: 'available'
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    description: 'Pay using Paytm, Amazon Pay, or other digital wallets',
    icon: Wallet,
    features: ['Quick Payment', 'Cashback Offers', 'Easy to Use'],
    processing_time: 'Instant',
    availability: 'maintenance'
  }
]

const getAvailabilityBadge = (availability: PaymentMethod['availability']) => {
  switch (availability) {
    case 'available':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Available</Badge>
    case 'maintenance':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Maintenance</Badge>
    case 'disabled':
      return <Badge variant="destructive">Unavailable</Badge>
    default:
      return null
  }
}

const getFeatureBadge = (feature: string) => {
  const badgeProps = {
    '0% Fee': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Instant': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Most Popular': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Instant Payment': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Secure': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    'Widely Accepted': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    'Direct Bank Transfer': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'No Additional Charges': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Quick Payment': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Cashback Offers': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'Easy to Use': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  }

  return (
    <Badge 
      variant="outline" 
      className={`text-xs ${badgeProps[feature as keyof typeof badgeProps] || 'bg-gray-100 text-gray-800'}`}
    >
      {feature}
    </Badge>
  )
}

export default function PaymentMethodSelector({ 
  selectedMethod, 
  onMethodSelect, 
  amount 
}: PaymentMethodSelectorProps) {
  const [hoveredMethod, setHoveredMethod] = useState<PaymentMethod['id'] | null>(null)

  const handleMethodSelect = (methodId: PaymentMethod['id']) => {
    const method = PAYMENT_METHODS.find(m => m.id === methodId)
    if (method?.availability === 'available') {
      onMethodSelect(methodId)
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          <CreditCard className="h-5 w-5" />
          Choose Payment Method
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Select your preferred payment method for ₹{amount.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon
            const isSelected = selectedMethod === method.id
            const isHovered = hoveredMethod === method.id
            const isDisabled = method.availability !== 'available'
            
            return (
              <div
                key={method.id}
                className={`
                  relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400' 
                    : isHovered && !isDisabled
                    ? 'border-green-300 bg-green-25 dark:bg-green-900/10 dark:border-green-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                  ${isDisabled 
                    ? 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800/50' 
                    : 'hover:shadow-md'
                  }
                `}
                onClick={() => !isDisabled && handleMethodSelect(method.id)}
                onMouseEnter={() => !isDisabled && setHoveredMethod(method.id)}
                onMouseLeave={() => setHoveredMethod(null)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                )}

                {/* Availability Badge */}
                <div className="absolute top-3 right-12">
                  {getAvailabilityBadge(method.availability)}
                </div>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`
                    p-3 rounded-lg
                    ${isSelected 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-gray-100 dark:bg-gray-700'
                    }
                  `}>
                    <Icon className={`
                      h-6 w-6
                      ${isSelected 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-300'
                      }
                    `} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`
                        font-semibold
                        ${isSelected 
                          ? 'text-green-900 dark:text-green-100' 
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {method.name}
                      </h3>
                    </div>

                    <p className={`
                      text-sm mb-3
                      ${isSelected 
                        ? 'text-green-700 dark:text-green-200' 
                        : 'text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {method.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {method.features.map((feature) => (
                        <div key={feature}>
                          {getFeatureBadge(feature)}
                        </div>
                      ))}
                    </div>

                    {/* Processing Time */}
                    <div className="flex items-center justify-between">
                      <span className={`
                        text-xs
                        ${isSelected 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        Processing: {method.processing_time}
                      </span>

                      {method.availability === 'maintenance' && (
                        <span className="text-xs text-yellow-600 dark:text-yellow-400">
                          Under maintenance
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow for selected method */}
                  {isSelected && (
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedMethod && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                // This will be handled by parent component
                console.log(`Proceeding with ${selectedMethod} payment`)
              }}
            >
              <div className="flex items-center gap-2">
                Continue with {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
            🔒 All payments are secured with 256-bit SSL encryption
          </p>
        </div>
      </CardContent>
    </Card>
  )
}