# Getting Started with Chefly Microservices

## 🎉 All Services Complete!

You now have a complete microservices backend for the Chefly platform.

## 📦 What's Built

### Services (7 total)
1. **Gateway** (Port 3000) - API Router
2. **Auth Service** (Port 3001) - Authentication & JWT
3. **User Service** (Port 3002) - Users, Chefs, Admin Management
4. **Booking Service** (Port 3003) - Booking Management
5. **Chat Service** (Port 3004) - Real-time Messaging
6. **Payment Service** (Port 3005) - Paymob Integration
7. **Notification Service** (Port 3006) - Expo Push Notifications

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pnpm install
```

### 2. Start Docker Services

```bash
# Start PostgreSQL + Redis
docker-compose up -d
```

### 3. Setup Database

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# (Optional) Open Prisma Studio to view database
pnpm prisma:studio
```

### 4. Configure Environment

Copy `.env.example` to `.env` and fill in:
- Database URL
- JWT secrets
- Paymob credentials
- OAuth credentials (optional)

### 5. Start All Services

```bash
# Start all services at once
pnpm dev
```

Or start individually:
```bash
pnpm dev:gateway
pnpm dev:auth
pnpm dev:user
pnpm dev:booking
pnpm dev:chat
pnpm dev:payment
pnpm dev:notification
```

## 📝 API Routes

All requests go through the Gateway (http://localhost:3000):

### Auth Service (`/auth`)
- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout
- `GET /auth/google` - Google OAuth
- `GET /auth/facebook` - Facebook OAuth

### User Service (`/users`)
- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `GET /users/:id` - Get user by ID
- `POST /users/push-token` - Save push token
- `GET /users/chefs` - List all chefs
- `GET /users/chefs/search` - Search chefs
- `GET /users/chefs/:id` - Get chef details
- `POST /users/chefs` - Create chef profile
- `PUT /users/chefs/:id` - Update chef profile

### Admin Routes (`/users/admin`)
- `GET /users/admin/users` - List all users
- `PUT /users/admin/users/:id/status` - Update user status
- `PUT /users/admin/users/:id/role` - Update user role
- `GET /users/admin/chefs/pending` - Pending chef approvals
- `PUT /users/admin/chefs/:id/approve` - Approve chef
- `PUT /users/admin/chefs/:id/reject` - Reject chef

### Booking Service (`/bookings`)
- `GET /bookings/my` - My bookings
- `GET /bookings/:id` - Get booking
- `POST /bookings` - Create booking
- `PUT /bookings/:id/status` - Update status
- `PUT /bookings/:id/complete` - Mark complete
- `GET /bookings/admin/bookings` - All bookings (admin)
- `PUT /bookings/admin/bookings/:id/review` - Review booking (admin)
- `GET /bookings/admin/stats` - Statistics (admin)

### Chat Service (`/chat`)
- HTTP: `GET /chat/conversations` - List conversations
- HTTP: `GET /chat/messages/:userId` - Message history
- HTTP: `PUT /chat/conversations/:userId/read` - Mark read
- WebSocket: Connect to `ws://localhost:3004` with JWT token

### Payment Service (`/payments`)
- `POST /payments/intent` - Create payment
- `GET /payments/:id` - Get payment
- `POST /payments/webhook` - Paymob webhook (public)

### Notification Service (`/notifications`)
- `POST /notifications/send` - Send notification
- `POST /notifications/send-to-user` - Internal service call
- `POST /notifications/send-to-users` - Bulk send

## 🗄️ Database Schema

Complete Prisma schema with:
- **User** - CLIENT, CHEF, ADMIN, SUPPORT roles
- **ChefProfile** - Chef details with admin approval
- **Booking** - With admin review fields
- **Payment** - Paymob integration
- **Message** - Chat messages
- **Review** - Ratings and comments
- **Favorite** - Saved chefs
- **RefreshToken** - JWT refresh tokens

## 🔐 Authentication

All protected routes require JWT token in `Authorization` header:

```
Authorization: Bearer <access_token>
```

Access tokens expire in 15 minutes. Use refresh token to get new access token.

## 🎯 User Roles

- **CLIENT** - Book chefs, leave reviews
- **CHEF** - Provide services, manage bookings
- **ADMIN** - Full platform management
- **SUPPORT** - Customer support, view-only for some actions

## 🧪 Testing

### Create First Admin User

```bash
# Register as admin via API or create directly in database
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@chefly.app",
    "username": "admin",
    "password": "your-secure-password",
    "role": "ADMIN"
  }'
```

### Test Authentication

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@chefly.app",
    "password": "your-secure-password"
  }'
```

### Create Test Chef

1. Register as chef
2. Create chef profile
3. Admin approves chef
4. Chef is now visible to clients

## 📚 Documentation

- `README.md` - Project overview
- `GETTING_STARTED.md` - This file
- `.env.example` - Environment variables template

## 🐛 Troubleshooting

### Services won't start
- Check if ports are available (3000-3006)
- Ensure PostgreSQL and Redis are running
- Check `.env` file exists and is configured

### Database connection fails
- Verify PostgreSQL is running: `docker ps`
- Check `DATABASE_URL` in `.env`
- Run migrations: `pnpm prisma:migrate`

### Gateway can't reach services
- Ensure all services are running
- Check service ports in `.env`
- Look at gateway logs for connection errors

## 🎊 Next Steps

1. **Test the APIs** - Use Postman or curl
2. **Connect Mobile App** - Update mobile `.env` with gateway URL
3. **Add Test Data** - Create users, chefs, bookings
4. **Configure Paymob** - Add real credentials
5. **Deploy** - Follow `DEPLOYMENT.md`

---

**Congratulations! Your microservices backend is ready! 🚀**

