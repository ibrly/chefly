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

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL (for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chefly
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `mobile/` and `backend/` directories
   - Update the values accordingly

4. Start development servers:
```bash
# Start both mobile and backend
pnpm dev

# Or start individually
pnpm dev:mobile
pnpm dev:backend
```

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

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Submit a pull request

## 📄 License

MIT

