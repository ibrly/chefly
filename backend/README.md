# Chefly Microservices Backend

## 🏗️ Architecture

Clean microservices architecture with:
- **6 Services** - Auth, User, Booking, Chat, Payment, Notification
- **API Gateway** - Single entry point routing to services
- **Shared Library** - Common utilities, types, and middleware
- **PostgreSQL** - Single database with Prisma ORM
- **Redis** - Caching and pub/sub

## 📦 What's Built

### ✅ Completed
1. **Project Structure** - Monorepo with pnpm workspaces
2. **Prisma Schema** - Complete database models:
   - User (CLIENT, CHEF, ADMIN, SUPPORT roles)
   - ChefProfile (with admin approval)
   - Booking (with admin review fields)
   - Payment (Paymob ready)
   - Review, Message, Favorite
   - RefreshToken
3. **Shared Library** - JWT, password hashing, auth middleware
4. **Docker Setup** - PostgreSQL + Redis
5. **TypeScript Config** - Monorepo paths configured

### ✅ All Services Complete!
1. **Gateway Service** ✅ - HTTP router to microservices
2. **Auth Service** ✅ - Login, register, OAuth, JWT
3. **User Service** ✅ - User CRUD, chef profiles, admin management
4. **Booking Service** ✅ - Bookings CRUD, admin review
5. **Chat Service** ✅ - Real-time messaging with Socket.io
6. **Payment Service** ✅ - Paymob integration
7. **Notification Service** ✅ - Expo push notifications

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
pnpm install
```

### 2. Start Docker Services
```bash
docker-compose up -d
```

### 3. Setup Database
```bash
pnpm prisma:generate
pnpm prisma:migrate
```

### 4. Start All Services
```bash
pnpm dev
```

## 📁 Structure

```
backend/
├── services/
│   ├── auth/         # Authentication & Authorization
│   ├── user/         # Users, Chefs, Admins, Support
│   ├── booking/      # Bookings management
│   ├── chat/         # Real-time messaging
│   ├── payment/      # Paymob integration
│   └── notification/ # Push notifications
├── gateway/          # API Gateway
├── shared/           # Shared utilities
│   ├── types/        # TypeScript types
│   ├── middleware/   # Auth middleware
│   └── utils/        # JWT, password utils
├── prisma/           # Database schema
└── docker-compose.yml
```

## 🔐 User Roles

- **CLIENT** - Book chefs, leave reviews
- **CHEF** - Provide services, manage bookings
- **ADMIN** - Manage platform, approve chefs, review orders
- **SUPPORT** - Customer support, help users

## 📊 Database Models

All models in `prisma/schema.prisma`:
- User management with multiple auth methods
- Chef profiles with approval workflow
- Bookings with admin review capability
- Payments with Paymob integration
- Real-time messaging
- Reviews and favorites

## 🎯 API Structure (When Complete)

```
Gateway (Port 3000)
├── /auth/*          → Auth Service (3001)
├── /users/*         → User Service (3002)
├── /bookings/*      → Booking Service (3003)
├── /chat/*          → Chat Service (3004)
├── /payments/*      → Payment Service (3005)
└── /notifications/* → Notification Service (3006)
```

## 📝 Environment Variables

Copy `.env.example` to `.env` and fill in:
- Database URL
- Redis URL
- JWT secrets
- Service ports
- Paymob credentials
- OAuth credentials

---

**Status:** ✅ ALL SERVICES COMPLETE! Ready for testing and deployment! 🎉

See `GETTING_STARTED.md` for quick start guide.

