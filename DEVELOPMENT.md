# Chefly Development Guide

This guide covers setting up the development environment and common development tasks.

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Git

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd chefly
```

### 2. Install Dependencies

```bash
# Install pnpm globally if not installed
npm install -g pnpm

# Install all dependencies
pnpm install
```

### 3. Setup Environment Variables

#### Mobile App

Create `mobile/.env`:

```bash
EXPO_PUBLIC_API_URL=http://localhost:1337/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:1337
EXPO_PUBLIC_PAYMOB_API_KEY=your_paymob_api_key
```

#### Backend

Create `backend/.env`:

```bash
# Copy from .env.example
cp backend/.env.example backend/.env

# Edit with your values
nano backend/.env
```

Generate secure secrets:

```bash
# Generate APP_KEYS
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate other secrets similarly
```

## Running Development Servers

### Start Both (Mobile + Backend)

```bash
pnpm dev
```

### Start Mobile Only

```bash
pnpm dev:mobile

# Or
cd mobile
pnpm dev
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

### Start Backend Only

```bash
pnpm dev:backend

# Or
cd backend
pnpm develop
```

Backend will be available at:
- API: http://localhost:1337/api
- Admin Panel: http://localhost:1337/admin

## Project Structure

```
chefly/
├── mobile/                     # React Native Expo app
│   ├── app/                   # Expo Router pages
│   │   ├── (auth)/           # Authentication screens
│   │   ├── (tabs)/           # Main app tabs
│   │   ├── _layout.tsx       # Root layout
│   │   └── index.tsx         # Entry point
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React Context providers
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   └── package.json
├── backend/                   # Strapi backend
│   ├── config/               # Strapi configuration
│   ├── src/
│   │   ├── api/             # Content types & controllers
│   │   │   ├── chef-profile/
│   │   │   ├── booking/
│   │   │   ├── review/
│   │   │   ├── message/
│   │   │   └── payment/
│   │   └── index.ts         # Bootstrap file
│   └── package.json
└── .github/
    └── workflows/            # CI/CD workflows
```

## Common Development Tasks

### Adding a New Screen (Mobile)

1. Create the screen file:

```bash
# For authenticated screens
touch mobile/app/(tabs)/client/new-screen.tsx

# For auth screens
touch mobile/app/(auth)/new-auth-screen.tsx
```

2. Add navigation in `_layout.tsx` if needed

### Adding a New API Endpoint (Backend)

1. Create content type via Strapi admin or manually:

```bash
mkdir -p backend/src/api/my-type/content-types/my-type
touch backend/src/api/my-type/content-types/my-type/schema.json
```

2. Create controller:

```bash
touch backend/src/api/my-type/controllers/my-type.ts
```

3. Create service:

```bash
touch backend/src/api/my-type/services/my-type.ts
```

4. Create routes:

```bash
touch backend/src/api/my-type/routes/my-type.ts
```

### Database Management

#### Reset Database (Development)

```bash
cd backend
rm -rf .tmp/data.db
pnpm develop
```

#### Create Admin User

On first run, visit http://localhost:1337/admin and create an admin user.

#### Seed Data

You can manually add data via the admin panel or create a seed script.

### Testing

#### Run All Tests

```bash
pnpm test
```

#### Run Mobile Tests

```bash
pnpm --filter chefly-mobile test
```

#### Run Backend Tests

```bash
pnpm --filter chefly-backend test
```

#### Run E2E Tests

```bash
pnpm test:e2e
```

### Code Quality

#### Format Code

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

#### Lint Code

```bash
# Lint all packages
pnpm lint

# Lint specific package
pnpm --filter chefly-mobile lint
```

### Building

#### Build Mobile

```bash
# Web version
cd mobile
npx expo export --platform web

# iOS/Android (requires EAS)
eas build --platform ios
eas build --platform android
```

#### Build Backend

```bash
pnpm --filter chefly-backend build
```

## Debugging

### Mobile Debugging

1. **React DevTools**: Shake device → "Debug" → Opens Chrome DevTools
2. **Expo DevTools**: Available in terminal or browser
3. **VS Code Debugger**: Use React Native Tools extension

### Backend Debugging

1. **Console Logs**: Check terminal output
2. **Strapi Admin Logs**: Available in admin panel
3. **VS Code Debugger**: Use Node.js debugger

### API Testing

Use tools like:
- Postman
- Insomnia
- cURL
- VS Code REST Client extension

Example API call:

```bash
# Register user
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@example.com",
    "password": "password123"
  }'
```

## Git Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Commit Messages

Follow conventional commits:

```
feat(mobile): add booking screen
fix(backend): resolve authentication issue
chore(deps): update dependencies
docs: update README
```

### Pull Requests

1. Create feature branch
2. Make changes
3. Run linting and tests
4. Create PR to `develop`
5. After review, merge to `develop`
6. Periodically merge `develop` to `main` for releases

## Useful Commands

```bash
# Install new dependency
pnpm add <package> --filter chefly-mobile
pnpm add <package> --filter chefly-backend

# Install dev dependency
pnpm add -D <package>

# Update all dependencies
pnpm update -r

# Clean install
pnpm clean-install

# Check outdated packages
pnpm outdated

# View logs
pnpm --filter chefly-mobile dev
pm2 logs chefly-backend
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 1337
lsof -ti:1337 | xargs kill -9

# Kill process on port 8081 (Metro)
lsof -ti:8081 | xargs kill -9
```

### Cache Issues

```bash
# Clear Expo cache
cd mobile
npx expo start -c

# Clear pnpm cache
pnpm store prune
```

### Module Resolution Issues

```bash
# Clear all node_modules
find . -name "node_modules" -type d -exec rm -rf {} +

# Reinstall
pnpm install
```

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Strapi Docs](https://docs.strapi.io)
- [React Navigation](https://reactnavigation.org)
- [React Query](https://tanstack.com/query)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## Need Help?

- Check existing GitHub issues
- Create a new issue with details
- Contact team members

