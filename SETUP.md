# Chefly Quick Setup Guide

This guide will help you get Chefly up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js 20.x or later**
   ```bash
   # Check version
   node --version
   
   # Install via nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 20
   nvm use 20
   ```

2. **pnpm 9.x or later**
   ```bash
   # Install pnpm globally
   npm install -g pnpm
   
   # Check version
   pnpm --version
   ```

3. **Git**
   ```bash
   # Check if installed
   git --version
   ```

4. **iOS Simulator (Mac only)** or **Android Studio (all platforms)**
   - For iOS: Install Xcode from Mac App Store
   - For Android: Install Android Studio from https://developer.android.com/studio

## Step 1: Clone and Install

```bash
# Navigate to your projects directory
cd ~/apps

# The project is already cloned at:
cd /Users/ebrahimsoliman/apps/chefly

# Install all dependencies
pnpm install
```

This will install dependencies for both the mobile app and backend.

## Step 2: Configure Environment Variables

### Backend Environment Variables

Create `backend/.env` file:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your preferred text editor:

```bash
# Use nano, vim, or VS Code
nano .env
```

Minimal configuration for development:

```env
HOST=0.0.0.0
PORT=1337

# Generate these with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=generateThisKey1,generateThisKey2,generateThisKey3,generateThisKey4
API_TOKEN_SALT=generateThisKey
ADMIN_JWT_SECRET=generateThisKey
TRANSFER_TOKEN_SALT=generateThisKey
JWT_SECRET=generateThisKey

# SQLite for development (default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Leave OAuth blank for now (optional)
CLIENT_URL=http://localhost:8081
```

**Quick secret generation:**

```bash
# Generate all secrets at once
node -e "for(let i=0; i<5; i++) console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy each generated string for APP_KEYS, API_TOKEN_SALT, etc.

### Mobile Environment Variables

Create `mobile/.env` file:

```bash
cd ../mobile
cp .env.example .env
```

Edit `mobile/.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:1337/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:1337
EXPO_PUBLIC_PAYMOB_API_KEY=your_key_here_later
```

## Step 3: Start Development Servers

You have two options:

### Option A: Start Both at Once (Recommended)

```bash
# From project root
cd /Users/ebrahimsoliman/apps/chefly
pnpm dev
```

This will start both the mobile app and backend simultaneously.

### Option B: Start Individually

**Terminal 1 - Backend:**
```bash
cd /Users/ebrahimsoliman/apps/chefly
pnpm dev:backend
```

**Terminal 2 - Mobile:**
```bash
cd /Users/ebrahimsoliman/apps/chefly
pnpm dev:mobile
```

## Step 4: Access the Application

### Backend (Strapi)

1. Open browser to: **http://localhost:1337/admin**
2. Create your admin account (first-time setup)
3. Complete the registration form

**Important:** Save your admin credentials!

### Mobile App

After running `pnpm dev:mobile`, you'll see a QR code in the terminal.

**Options to run:**

1. **iOS Simulator (Mac only):**
   - Press `i` in the terminal
   - Simulator will open automatically

2. **Android Emulator:**
   - Make sure Android Studio emulator is running
   - Press `a` in the terminal

3. **Physical Device:**
   - Install "Expo Go" app from App Store or Play Store
   - Scan the QR code with your camera (iOS) or Expo Go app (Android)

4. **Web Browser:**
   - Press `w` in the terminal
   - Opens at http://localhost:8081

## Step 5: Configure Strapi Roles (Backend)

After creating your admin account:

1. Go to **Settings** → **USERS & PERMISSIONS PLUGIN** → **Roles**

2. **Configure "Authenticated" role:**
   - Expand each content type (Booking, Chef-Profile, Message, Payment, Review)
   - Check permissions needed for users
   - Save

3. **Create "Chef" role:**
   - Click "Add new role"
   - Name: `chef`
   - Description: `Chef users`
   - Configure permissions for chef-specific actions
   - Save

4. **Create "Client" role:**
   - Click "Add new role"
   - Name: `client`
   - Description: `Client users`
   - Configure permissions for client actions
   - Save

## Step 6: Test the Application

### Create Test Users

**Via Mobile App:**
1. Open the mobile app
2. Tap "Get Started"
3. Select "I want to: Hire a Chef" or "Become a Chef"
4. Fill in registration form
5. Login

**Via API (Postman/cURL):**

```bash
# Register as client
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testclient",
    "email": "client@test.com",
    "password": "Test123456",
    "role": "client"
  }'

# Register as chef
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testchef",
    "email": "chef@test.com",
    "password": "Test123456",
    "role": "chef"
  }'
```

### Create Test Chef Profile

1. Login to Strapi admin panel
2. Go to **Content Manager** → **Chef Profile**
3. Click "Create new entry"
4. Fill in chef details
5. Set `isApproved` to `true`
6. Save

Now clients can see this chef in the mobile app!

## Common Issues & Solutions

### Issue: "pnpm: command not found"

**Solution:**
```bash
npm install -g pnpm
```

### Issue: Backend won't start - "Port 1337 already in use"

**Solution:**
```bash
# Find process using port 1337
lsof -ti:1337

# Kill the process
lsof -ti:1337 | xargs kill -9

# Or use a different port in backend/.env
PORT=1338
```

### Issue: Mobile app shows "Network request failed"

**Solution:**
1. Make sure backend is running on http://localhost:1337
2. Check `mobile/.env` has correct API URL
3. For physical devices, use your computer's IP instead of localhost:
   ```env
   EXPO_PUBLIC_API_URL=http://192.168.1.XXX:1337/api
   ```
4. Restart Expo: Press `r` in terminal

### Issue: iOS Simulator won't open

**Solution:**
```bash
# Make sure Xcode is installed
xcode-select --install

# Open simulator manually
open -a Simulator
```

### Issue: Android emulator not detected

**Solution:**
1. Open Android Studio
2. Go to Tools → AVD Manager
3. Create/Start a virtual device
4. Run `pnpm dev:mobile` again and press `a`

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clear all node_modules
find . -name "node_modules" -type d -prune -exec rm -rf {} +

# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

## Development Workflow

```bash
# Start development
pnpm dev

# In separate terminals:

# Run linting
pnpm lint

# Format code
pnpm format

# Run tests (when implemented)
pnpm test
```

## Next Steps

1. **Explore the Code:**
   - Mobile app: `mobile/app/` - All screens
   - Backend: `backend/src/api/` - All API endpoints

2. **Read Documentation:**
   - `DEVELOPMENT.md` - Detailed development guide
   - `DEPLOYMENT.md` - Production deployment guide
   - `README.md` - Project overview

3. **Customize:**
   - Update app name and icons in `mobile/app.json`
   - Customize UI theme colors
   - Add your business logic

4. **Setup OAuth (Optional):**
   - Configure Google, Apple, Facebook OAuth in Strapi admin
   - Add client IDs and secrets to `backend/.env`

5. **Setup Paymob (For payments):**
   - Create Paymob account at https://paymob.com
   - Get API keys
   - Add to both `backend/.env` and `mobile/.env`

## Getting Help

- Check `DEVELOPMENT.md` for detailed guides
- Review Strapi docs: https://docs.strapi.io
- Review Expo docs: https://docs.expo.dev
- Check GitHub issues

## Quick Commands Reference

```bash
# Start everything
pnpm dev

# Start mobile only
pnpm dev:mobile

# Start backend only
pnpm dev:backend

# Build everything
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check

# Run tests
pnpm test
```

## You're All Set! 🎉

Your Chefly development environment is ready. Happy coding!

For detailed development guides, see `DEVELOPMENT.md`.
For production deployment, see `DEPLOYMENT.md`.

