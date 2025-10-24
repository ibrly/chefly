# Chefly - Chef Marketplace Platform

A full-stack chef marketplace mobile app connecting chefs with clients, built with React Native (Expo) and Strapi CMS.

## 🏗️ Tech Stack

- **Frontend**: React Native + Expo (iOS, Android, Web)
- **Backend**: Strapi v4 (Headless CMS with admin panel)
- **Database**: PostgreSQL
- **Monorepo**: pnpm workspace
- **Payment**: Paymob (Egypt)
- **Real-time**: Socket.io

## 📁 Project Structure

```
chefly/
├── mobile/          # React Native Expo app
├── backend/         # Strapi backend
└── .github/         # CI/CD workflows
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env
# Edit .env files with your values

# Start development servers
pnpm dev
```

**📖 For detailed setup instructions, see [SETUP.md](SETUP.md)**

### First Time Setup

1. **Backend**: Open http://localhost:1337/admin and create admin account
2. **Mobile**: Press `i` for iOS, `a` for Android, or `w` for web
3. **Configure**: Set up user roles in Strapi admin panel

That's it! 🎉

## 📱 Mobile App

- iOS: Press `i` in the Expo dev server
- Android: Press `a` in the Expo dev server
- Web: Press `w` in the Expo dev server

## 🔧 Backend (Strapi)

Access the Strapi admin panel at `http://localhost:1337/admin`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all development servers |
| `pnpm dev:mobile` | Start mobile app only |
| `pnpm dev:backend` | Start backend only |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm test` | Run all tests |

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development guide and workflows
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide

## 🎯 Features

### Client Features
- ✅ Browse and search chefs by cuisine, price, rating, location
- ✅ View chef profiles with portfolio and reviews
- ✅ Book chef services with date/time selection
- ✅ Real-time chat with chefs
- ✅ Payment integration (Paymob)
- ✅ Rate and review chefs
- ✅ Manage bookings and favorites

### Chef Features
- ✅ Complete profile with portfolio and certifications
- ✅ Manage booking requests (accept/decline)
- ✅ Set hourly rates and availability
- ✅ Real-time chat with clients
- ✅ Track earnings and reviews
- ✅ Update availability status

### Admin Features
- ✅ Approve/reject chef applications
- ✅ Manage users, bookings, and content
- ✅ View platform metrics and analytics
- ✅ Moderate reviews and resolve disputes

## 🔐 Security

- JWT-based authentication
- Role-based access control (Client, Chef, Admin)
- OAuth integration (Google, Apple, Facebook)
- Secure payment processing via Paymob
- HTTPS enforced in production
- Environment-based configuration

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Make your changes
3. Run linting and tests (`pnpm lint && pnpm test`)
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

MIT

