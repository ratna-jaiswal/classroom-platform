import { NextRequest, NextResponse } from 'next/server'

// Test card configurations
const TEST_CARDS = {
  '4111111111111111': {
    name: 'Valid Card',
    behavior: 'success',
    message: 'Payment processed successfully!',
  },
  '4000000000000002': {
    name: 'Invalid Card',
    behavior: 'invalid_card',
    message: 'Card was declined. Please check your card details.',
  },
  '4000000000009995': {
    name: 'Insufficient Funds',
    behavior: 'insufficient_funds',
    message: 'Payment failed due to insufficient funds.',
  },
  '4000000000000069': {
    name: 'Expired Card',
    behavior: 'expired_card',
    message: 'Card has expired. Please use a different card.',
  },
  '4000000000000119': {
    name: 'Network Error',
    behavior: 'network_error',
    message: 'Network timeout. Please try again later.',
  },
  '4000000000000127': {
    name: 'Processing Error',
    behavior: 'failed',
    message: 'Payment processing error. Please contact support.',
  },
}

interface PaymentRequest {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardHolderName: string
  amount: number
  installmentId?: string
}

interface PaymentResponse {
  success: boolean
  transactionId?: string
  message: string
  status: 'success' | 'failed' | 'invalid_card' | 'insufficient_funds' | 'expired_card' | 'network_error'
  timestamp: string
}

// Simulate payment processing delay
const simulateProcessingDelay = () => {
  return new Promise(resolve => {
    const delay = 1500 + Math.random() * 2500 // 1.5-4 seconds
    setTimeout(resolve, delay)
  })
}

// Generate transaction ID
const generateTransactionId = () => {
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 10000)
  return `TXN${timestamp}${randomNum.toString().padStart(4, '0')}`
}

// Validate card expiry
const isCardExpired = (month: string, year: string) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  const expiryYear = parseInt(year)
  const expiryMonth = parseInt(month)
  
  if (expiryYear < currentYear) return true
  if (expiryYear === currentYear && expiryMonth < currentMonth) return true
  
  return false
}

// Validate CVV
const isValidCVV = (cvv: string, cardNumber: string) => {
  const cleanCardNumber = cardNumber.replace(/\s/g, '')
  // American Express cards start with 3 and have 4-digit CVV
  if (cleanCardNumber.startsWith('3')) {
    return cvv.length === 4 && /^\d{4}$/.test(cvv)
  }
  // Other cards have 3-digit CVV
  return cvv.length === 3 && /^\d{3}$/.test(cvv)
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    
    // Validate required fields
    if (!body.cardNumber || !body.expiryMonth || !body.expiryYear || 
        !body.cvv || !body.cardHolderName || !body.amount) {
      return NextResponse.json({
        success: false,
        message: 'Missing required payment information',
        status: 'failed',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

    // Clean card number
    const cleanCardNumber = body.cardNumber.replace(/\s/g, '')
    
    // Basic validation
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      return NextResponse.json({
        success: false,
        message: 'Invalid card number length',
        status: 'invalid_card',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

    if (!/^\d+$/.test(cleanCardNumber)) {
      return NextResponse.json({
        success: false,
        message: 'Card number must contain only digits',
        status: 'invalid_card',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

    // Validate CVV
    if (!isValidCVV(body.cvv, cleanCardNumber)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid CVV',
        status: 'invalid_card',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

        // Luhn check for card numbers
        const luhnCheck = (num: string) => {
          let sum = 0
          let dbl = false
          for (let i = num.length - 1; i >= 0; i--) {
            let d = Number(num[i])
            if (dbl) {
              d *= 2
              if (d > 9) d -= 9
            }
            sum += d
            dbl = !dbl
          }
          return sum % 10 === 0
        }

        if (!luhnCheck(cleanCardNumber)) {
          return NextResponse.json({
            success: false,
            message: 'Invalid card number (failed Luhn check)',
            status: 'invalid_card',
            timestamp: new Date().toISOString(),
          }, { status: 400 })
        }

    // Check if card is expired
    if (isCardExpired(body.expiryMonth, body.expiryYear)) {
      return NextResponse.json({
        success: false,
        message: 'Card has expired',
        status: 'expired_card',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

    // Validate amount
    if (body.amount <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid payment amount',
        status: 'failed',
        timestamp: new Date().toISOString(),
      }, { status: 400 })
    }

    // Simulate processing delay
    await simulateProcessingDelay()

    // Check if it's a test card
    const testCard = TEST_CARDS[cleanCardNumber as keyof typeof TEST_CARDS]
    
    if (testCard) {
      // Handle test card scenarios
      const response: PaymentResponse = {
        success: testCard.behavior === 'success',
        message: testCard.message,
        status: testCard.behavior as PaymentResponse['status'],
        timestamp: new Date().toISOString(),
      }

      if (response.success) {
        response.transactionId = generateTransactionId()
      }

      return NextResponse.json(response)
    } else {
      // For non-test cards, simulate random outcomes with weighted probabilities
      const outcomes = [
        { success: true, status: 'success' as const, message: 'Payment processed successfully!', weight: 70 },
        { success: false, status: 'invalid_card' as const, message: 'Card was declined.', weight: 15 },
        { success: false, status: 'insufficient_funds' as const, message: 'Insufficient funds.', weight: 10 },
        { success: false, status: 'network_error' as const, message: 'Network error occurred.', weight: 5 },
      ]

      // Weighted random selection
      const totalWeight = outcomes.reduce((sum, outcome) => sum + outcome.weight, 0)
      let random = Math.random() * totalWeight
      
      let selectedOutcome = outcomes[0]
      for (const outcome of outcomes) {
        random -= outcome.weight
        if (random <= 0) {
          selectedOutcome = outcome
          break
        }
      }

      const response: PaymentResponse = {
        success: selectedOutcome.success,
        message: selectedOutcome.message,
        status: selectedOutcome.status,
        timestamp: new Date().toISOString(),
      }

      if (response.success) {
        response.transactionId = generateTransactionId()
      }

      return NextResponse.json(response)
    }

  } catch (error) {
    console.error('Payment processing error:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error during payment processing',
      status: 'failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

// GET endpoint to retrieve test card information
export async function GET() {
  const testCardsInfo = Object.entries(TEST_CARDS).map(([number, info]) => ({
    number,
    name: info.name,
    behavior: info.behavior,
    description: info.message,
  }))

  return NextResponse.json({
    testCards: testCardsInfo,
    message: 'Test card information retrieved successfully',
  })
}