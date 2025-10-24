# 🍽️ Chefly - Chef Marketplace Platform

A full-stack chef booking platform connecting professional chefs with clients for home cooking experiences.

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 27 Atomic Design components
- **Documentation**: Storybook
- **State Management**: React Context API

### Backend

- **Architecture**: Microservices
- **Framework**: Express.js + TypeScript
- **API Gateway**: Port 3000
- **Database**: PostgreSQL (Prisma ORM)
- **Cache**: Redis
- **Real-time**: Socket.io
- **Authentication**: JWT

### Services

- **Auth Service** (3001) - Authentication & authorization
- **User Service** (3002) - User profiles & chef management
- **Booking Service** (3003) - Booking CRUD operations
- **Chat Service** (3004) - Real-time messaging
- **Payment Service** (3005) - Paymob integration
- **Notification Service** (3006) - Push notifications

---

## 📁 Project Structure

```
chefly/
├── frontend/              # Next.js web application
│   ├── src/
│   │   ├── app/          # Next.js pages (App Router)
│   │   ├── components/   # Atomic Design components
│   │   │   ├── atoms/    # Basic UI elements (12)
│   │   │   ├── molecules/# Composite components (9)
│   │   │   └── organisms/# Complex sections (6)
│   │   ├── contexts/     # React Context providers
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom React hooks
│   │   └── types/        # TypeScript types
│   └── .storybook/       # Component documentation
│
├── backend/              # Microservices backend
│   ├── gateway/          # API Gateway
│   ├── services/         # Microservices
│   │   ├── auth/
│   │   ├── user/
│   │   ├── booking/
│   │   ├── chat/
│   │   ├── payment/
│   │   └── notification/
│   ├── shared/           # Shared utilities
│   └── prisma/           # Database schema & migrations
│
└── docker-compose.yml    # PostgreSQL & Redis
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose (for databases)

### 1. Clone & Install

```bash
# Install dependencies
pnpm install
```

### 2. Start Databases

```bash
# Start PostgreSQL and Redis
cd backend
docker-compose up -d
```

### 3. Configure Environment

```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env if needed (defaults should work)

# Frontend environment
cp frontend/.env.local.example frontend/.env.local
# Defaults are already set
```

Environment files are already configured with:

- Database: `postgresql://chefly:chefly_password@localhost:5432/chefly`
- Redis: `localhost:6379`
- API Gateway: `http://localhost:3000`
- JWT secrets (change in production!)

### 4. Run Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate deploy
```

### 5. Start Backend Services

```bash
cd backend
pnpm run dev
```

This starts all 7 services:

- ✅ Gateway (3000)
- ✅ Auth (3001)
- ✅ User (3002)
- ✅ Booking (3003)
- ✅ Chat (3004)
- ✅ Payment (3005)
- ✅ Notification (3006)

### 6. Start Frontend

```bash
# In a new terminal
cd frontend
pnpm run dev
```

Frontend will be available at: **<http://localhost:3001>**

---

## 👥 Test Accounts

### Quick Login Credentials

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Client** | `client@chefly.com` | `Client123!` | Test client account (Sarah Johnson) |
| **Chef** | `chef1@chefly.com` | `Chef123!` | Test chef account (Mario Rossi) |
| **Chef** | `chef2@chefly.com` | `Chef123!` | Test chef account (Sakura Tanaka) |
| **Admin** | `admin@chefly.com` | `Admin123!` | Admin account for management |
| **Client** | `john@example.com` | `John123!` | Alternative client (John Doe) |

### Creating Test Accounts

You can create these accounts via:

**Option 1: API Endpoint**

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@chefly.com",
    "password": "Client123!",
    "username": "testclient",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "role": "CLIENT"
  }'
```

**Option 2: Frontend Registration**

1. Go to <http://localhost:3001/register>
2. Fill in the form
3. Select role (CLIENT or CHEF)
4. Submit

**Option 3: Prisma Studio**

```bash
cd backend
npx prisma studio
```

Then manually create users in the database.

---

## 📖 Documentation

### Frontend

- **Development**: `cd frontend && pnpm run dev`
- **Build**: `cd frontend && pnpm run build`
- **Storybook**: `cd frontend && npm run storybook`
  - View all 27 components with interactive docs
  - Access at: <http://localhost:6006>

### Backend

- **API Gateway**: <http://localhost:3000>
  - Lists all available services and endpoints
- **Service Health**: `http://localhost:3000/health`
- **Database Studio**: `cd backend && npx prisma studio`
  - Visual database editor at <http://localhost:5555>

### Component Library

```bash
cd frontend
npm run storybook
```

Browse 27 production-ready components:

- **12 Atoms**: Alert, Avatar, Badge, Button, Card, Input, Modal, Select, Spinner, Tabs, Textarea, Toast
- **9 Molecules**: BookingCard, ChefCard, EmptyState, FeatureCard, FilterPanel, NotificationItem, ReviewCard, SearchBar, StatCard
- **6 Organisms**: BookingForm, ChefGrid, Footer, Hero, Navbar, ReviewList

---

## 🧪 Testing

### Test Endpoints

```bash
# Gateway health
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","username":"test","role":"CLIENT"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### Frontend Tests

1. Navigate to <http://localhost:3001>
2. Register a new account
3. Login with credentials
4. Browse chefs (add via Prisma Studio)
5. Create a booking
6. Test all features

---

## 🔧 Development

### Stop Services

```bash
# Stop backend
lsof -ti:3000,3001,3002,3003,3004,3005,3006 | xargs kill -9

# Stop databases
cd backend
docker-compose down
```

### Restart Services

```bash
# Start databases
cd backend
docker-compose up -d

# Start backend
pnpm run dev

# Start frontend (new terminal)
cd frontend
pnpm run dev
```

### View Logs

```bash
# Backend logs
tail -f /tmp/backend-services.log

# Frontend logs
# Check terminal where pnpm run dev is running
```

---

## 📊 Features

### ✅ Implemented

- User authentication (register, login, JWT)
- Chef profiles & discovery
- Advanced search & filters
- Booking management
- Real-time chat (Socket.io)
- Payment integration (Paymob)
- Push notifications
- Favorites system
- Review & rating system
- Responsive design (mobile/tablet/desktop)
- Role-based access control
- Profile management

### 🚧 Coming Soon

- Email verification
- OAuth (Google, Facebook, Apple)
- Advanced analytics
- Admin dashboard
- Booking calendar view
- Multi-language support
- Payment history

---

## 🏗️ Architecture

### Frontend Architecture

- **Atomic Design**: Scalable component organization
- **Type Safety**: 100% TypeScript coverage
- **State Management**: Context API for global state
- **API Layer**: Axios with interceptors for token refresh
- **Routing**: Next.js App Router with layouts
- **Styling**: Tailwind CSS with custom design system

### Backend Architecture

- **Microservices**: Independent, scalable services
- **API Gateway**: Single entry point, service routing
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for session & data caching
- **Real-time**: Socket.io for chat & notifications
- **Authentication**: JWT-based with refresh tokens

---

## 📝 License

This project is private and proprietary.

---

## 🤝 Contributing

This is a private project. Contact the maintainers for access.

---

## 📞 Support

For issues or questions:

1. Check documentation
2. Review Storybook components
3. Check backend API at <http://localhost:3000>
4. Contact the development team

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
