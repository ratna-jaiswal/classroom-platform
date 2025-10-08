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
- **Multiple Payment Methods** - Card, UPI, Net Banking, Digital Wallet
- **Smart Payment Selection** - Visual method selector with availability status
- Multiple payment scenarios (success, failure, expired cards, etc.)
- Transaction history and receipts
- Installment-based payments
- Real-time payment processing simulation
- **Custom Amount Input** - Users can enter any amount between ₹100-₹5,00,000
- **Method-Specific UI** - Dynamic interface based on selected payment method

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
| `4000 0000 0000 0101` | Visa | 3D Secure authentication required |

#### 🔄 Other Payment Methods

| Method | Test Value | Description |
|--------|------------|-------------|
| UPI    | `test@upi` | Successful UPI payment |
| UPI    | `fail@upi` | Failed UPI payment |
| Net Banking | Bank selection | Select any bank for simulation |
| Wallet | Wallet selection | Select any wallet for simulation |

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
- MongoDB (v4.4 or later) - Can be local installation or MongoDB Atlas

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

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/sikshalink
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sikshalink

   # JWT Configuration  
   JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
   JWT_EXPIRES_IN=7d

   # App Configuration
   NODE_ENV=development
   ```

4. Start MongoDB (if using local installation):
   ```bash
   # On Windows
   mongod

   # On macOS (with Homebrew)
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

### Backend
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless API endpoints
- [MongoDB](https://www.mongodb.com/) - NoSQL database with Mongoose ODM
- [JWT Authentication](https://jwt.io/) - Secure user authentication with HTTP-only cookies
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## � API Documentation

### Authentication Endpoints

The platform includes a complete JWT-based authentication system:

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | `{ name, email, password, role }` |
| POST | `/api/auth/login` | User login | `{ email, password }` |
| POST | `/api/auth/logout` | User logout | - |
| GET | `/api/users/me` | Get user profile | - |
| PUT | `/api/users/me` | Update user profile | `{ name?, profile? }` |

### Example Usage

```bash
# Register a new user
curl -X POST "http://localhost:3000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123","role":"student"}'

# Login
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}'

# Get profile (requires authentication cookie)
curl -X GET "http://localhost:3000/api/users/me" \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

For detailed API documentation, see [docs/API.md](docs/API.md).

## �👥 Contributing

SikshaLink is open for contributions as part of GSSoC 2025! We welcome developers of all skill levels. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Good First Issues
- Setting up API routes for authentication
- Creating database models
- Implementing basic CRUD operations
- Adding unit tests
- Improving accessibility
- Bug fixes and UI improvements

## 🛠️ Development Status

### ✅ Completed Features
- **Authentication System**: Complete JWT-based authentication with registration, login, logout
- **User Management**: User profiles with role-based access (student, teacher, admin)
- **Database Integration**: MongoDB with Mongoose ODM and optimized connections
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **API Documentation**: Complete API reference with examples and error codes
- **Security**: Password hashing, secure cookies, input validation

### 🚧 In Progress
- Role-based access control middleware
- Frontend authentication integration
- Profile management UI

### 📋 Planned Features
- Assignment management system
- Live class scheduling and management
- Attendance tracking
- Resource sharing and management
- Real-time notifications
- Fee management system
- Mentorship platform integration

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
