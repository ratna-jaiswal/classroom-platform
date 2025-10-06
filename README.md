# SikshaLink - Modern Learning Management System

![SikshaLink Logo](public/placeholder-logo.svg)

## 🚀 About SikshaLink

SikshaLink is a next-generation learning management system that connects students and teachers in a seamless digital environment. Our platform enables educational institutions to manage classes, assignments, attendance, resources, and more all in one place.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue)](https://tailwindcss.com/)
[![GSSoC 2025](https://img.shields.io/badge/GSSoC-2025-orange)](https://gssoc.girlscript.tech/)

## 🔍 Features

- **Dashboard**: Personalized dashboards for students and teachers
- **Live Classes**: Schedule and attend virtual classes
- **Assignments**: Create, submit, and grade assignments
- **Resources**: Share and access educational materials
- **Attendance**: Track student attendance
- **Notifications**: Real-time updates on classes and assignments
- **Mentorship**: Connect with mentors for personalized guidance
- **Fee Management**: Track and manage fee payments
- **Payment Processing**: Secure payment gateway with test card support

## 💳 Payment System & Test Cards

The platform includes a comprehensive payment system for handling student fee payments. The system supports various payment scenarios and provides test cards for development and testing purposes.

### Payment Features
- Secure payment form with validation
- Multiple payment scenarios (success, failure, expired cards, etc.)
- Transaction history and receipts
- Installment-based payments
- Real-time payment processing simulation

### Test Cards for Development

Use these test card numbers to simulate different payment scenarios:

#### ✅ Successful Payments
| Card Number | Card Type | Description |
|-------------|-----------|-------------|
| `4111 1111 1111 1111` | Visa | Payment will succeed |

#### ❌ Failed Payments
| Card Number | Card Type | Description |
|-------------|-----------|-------------|
| `4000 0000 0000 0002` | Visa | Card will be declined |
| `4000 0000 0000 9995` | Visa | Insufficient funds |
| `4000 0000 0000 0069` | Visa | Expired card |

#### 🔧 Error Scenarios
| Card Number | Card Type | Description |
|-------------|-----------|-------------|
| `4000 0000 0000 0119` | Visa | Network timeout simulation |
| `4000 0000 0000 0127` | Visa | Generic processing error |

### Test Card Usage Instructions

1. Navigate to the **Fees** section as a student
2. Click on **"Pay Now"** for any pending installment or use **"Make Custom Payment"**
3. Use any of the test card numbers above
4. Fill in the following test details:
   - **Cardholder Name**: Any name (e.g., "Test User")
   - **Expiry Date**: Any future date (e.g., 12/2028)
   - **CVV**: Any 3-digit number (e.g., 123)
5. Submit the form to see the simulated payment result

### Payment Flow
1. **Fee Overview**: View pending dues and payment history
2. **Payment Form**: Enter card details with real-time validation
3. **Processing**: Simulated payment processing with realistic delays
4. **Result**: Success/failure message with transaction details
5. **Receipt**: Downloadable payment confirmation

### API Endpoints
- `POST /api/payments/process` - Process payment transactions
- `GET /api/payments/process` - Retrieve test card information

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [License](#license)
- [Contact](#contact)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/classroom-platform.git
   cd classroom-platform
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
classroom-platform/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard pages
│   ├── assignments/      # Assignment pages
│   ├── attendance/       # Attendance pages
│   └── ...               # Other feature pages
├── components/           # React components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── lib/                  # Utility functions & shared logic
├── public/               # Static assets
├── styles/               # Global styles
└── ...                   # Configuration files
```

## 💻 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Lucide React](https://lucide.dev/) - Icon library

### Backend (To Be Implemented)
We are looking for contributions to build the backend with:
- Node.js/Express.js or Next.js API routes
- MongoDB or PostgreSQL
- Authentication with NextAuth.js
- Real-time features with Socket.io or similar

## 👥 Contributing

SikshaLink is open for contributions as part of GSSoC 2025! We welcome developers of all skill levels. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Good First Issues
- Setting up API routes for authentication
- Creating database models
- Implementing basic CRUD operations
- Adding unit tests
- Improving accessibility
- Bug fixes and UI improvements

## 🛠️ Backend Development

The project currently has a frontend interface and needs backend implementation. Priority areas:

- User authentication and authorization
- Database models and relationships
- API endpoints for all features
- File upload and management
- Real-time notifications
- Testing and documentation

## 🎨 Frontend Development

While our focus is on backend contributions, we also welcome frontend improvements:

- Accessibility enhancements
- Performance optimizations
- Additional UI components
- Responsive design improvements
- Unit and integration tests

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue or contact the maintainer:
- Email: ratnaiiitg@gmail.com
- LinkedIn: [Ratna Jaiswal](https://www.linkedin.com/in/ratna-jaiswal/)

## ⭐ Support

If you find this project helpful or interesting:

- Please consider giving it a star on GitHub ⭐
- Follow the project maintainer on [GitHub](https://github.com/ratna-jaiswal)
- Connect on [LinkedIn](https://www.linkedin.com/in/ratna-jaiswal/)

Your support motivates continued development and maintenance!

---

<p align="center">Made with ❤️ for GSSoC 2025</p>
