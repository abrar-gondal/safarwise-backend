# SafarWise Backend 🚀

REST API for SafarWise travel booking platform built with Node.js + Express + MongoDB.

## 🔗 Live API
[https://safarwise-backend-production.up.railway.app](https://safarwise-backend-production.up.railway.app)

## 🛠️ Built With
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (OTP emails)

## ✨ Features
- User authentication with JWT
- OTP based password reset via email
- Package management
- Booking system
- Contact form
- City tours
- Admin controls

## 📌 API Endpoints

### Auth
POST /api/auth/register        # Register user
POST /api/auth/login           # Login user
GET  /api/auth/me              # Get current user
PUT  /api/auth/update          # Update profile
POST /api/auth/forgot-password # Send OTP
POST /api/auth/verify-otp      # Verify OTP
POST /api/auth/reset-password  # Reset password

### Packages
GET /api/packages              # Get all packages
GET /api/packages/:id          # Get single package

### Bookings
POST /api/bookings             # Create booking
GET  /api/bookings/my          # Get my bookings
PUT  /api/bookings/:id/cancel  # Cancel booking
GET  /api/bookings/all         # Get all bookings (admin)
PUT  /api/bookings/:id/status  # Update status (admin)

### Other
POST /api/contact              # Send contact message
GET  /api/city-tours           # Get city tours

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation
```bash
git clone https://github.com/abrar-gondal/safarwise-backend.git
cd safarwise-backend
npm install
```

### Environment Variables
Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Run Locally
```bash
npm run dev
```

## 🌐 Deployment
Deployed on **Railway** with automatic deployments on every push to main branch.

## 👨‍💻 Developer
Abrar Gondal
