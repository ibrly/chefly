# Quick Start Guide - Running Chefly on Web

This guide will help you run the Chefly platform locally in your web browser.

## Prerequisites Installation

### Step 1: Install Homebrew (if on macOS)

```bash
# Install Homebrew (package manager for macOS)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install Node.js 20

```bash
# Install Node.js using Homebrew
brew install node@20

# Or download from: https://nodejs.org/
# Choose "20.x LTS" version
```

### Step 3: Install pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

## Project Setup

### Step 4: Install Project Dependencies

```bash
# Navigate to project directory
cd /Users/ebrahimsoliman/apps/chefly

# Install all dependencies (takes 2-5 minutes)
pnpm install
```

### Step 5: Configure Environment Variables

**Backend Configuration:**

```bash
# Copy example environment file
cp backend/.env.example backend/.env

# Edit the file
nano backend/.env
```

**Minimal backend/.env configuration for local development:**

```env
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=development

# App Keys (generate with: node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")
APP_KEYS=generateRandomKey1,generateRandomKey2
API_TOKEN_SALT=generateRandomSalt1
ADMIN_JWT_SECRET=generateRandomSecret1
TRANSFER_TOKEN_SALT=generateRandomSalt2
JWT_SECRET=generateRandomSecret2

# Database (SQLite for local development - no setup needed!)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# URLs
CLIENT_URL=http://localhost:8081
SERVER_URL=http://localhost:1337

# Paymob (optional for now - use dummy values)
PAYMOB_API_KEY=dummy-key-for-development
PAYMOB_INTEGRATION_ID=12345
PAYMOB_IFRAME_ID=12345
PAYMOB_HMAC_SECRET=dummy-secret
```

**Mobile Configuration:**

```bash
# Create mobile environment file
cat > mobile/.env << 'EOF'
EXPO_PUBLIC_API_URL=http://localhost:1337/api
EOF
```

## Running the Application

### Step 6: Start Backend Server

Open a new terminal window:

```bash
cd /Users/ebrahimsoliman/apps/chefly

# Start backend (Strapi)
pnpm dev:backend

# Wait until you see:
# ✔ Server started successfully
# ┌─────────────────────────────────────────────────┐
# │ Welcome to Strapi admin!                        │
# │ http://localhost:1337/admin                     │
# └─────────────────────────────────────────────────┘
```

### Step 7: Create Admin Account

1. Open browser: http://localhost:1337/admin
2. Fill in admin registration form:
   - **First name:** Your name
   - **Last name:** Your last name
   - **Email:** your-email@example.com
   - **Password:** Choose a strong password
3. Click "Let's start"

### Step 8: Create User Roles

In Strapi admin:

1. Go to **Settings** → **Users & Permissions** → **Roles**
2. Edit **Public** role (for unauthenticated users)
3. Edit **Authenticated** role (for logged-in users)

### Step 9: Start Mobile App on Web

Open a **NEW terminal window** (keep backend running):

```bash
cd /Users/ebrahimsoliman/apps/chefly

# Start mobile app for web
pnpm dev:mobile

# Or specifically for web:
cd mobile
pnpm web
```

### Step 10: Access the Application

The app will automatically open in your browser at:

**http://localhost:8081**

If it doesn't open automatically, press **`w`** in the terminal to open web version.

## What You'll See

### Welcome Screen
- "Browse as Client" button
- "Join as Chef" button
- Login/Register options

### As Client:
- **Home Tab:** Featured chefs, categories, search
- **Explore Tab:** Browse all chefs with filters
- **My Bookings Tab:** View your bookings
- **Messages Tab:** Chat with chefs
- **Profile Tab:** Favorites, settings, logout

### As Chef:
- **Dashboard Tab:** Statistics and earnings
- **Bookings Tab:** Manage booking requests
- **Messages Tab:** Chat with clients
- **Profile Tab:** Update profile, availability

## Testing the Application

### Create Test Chef Profile

1. In Strapi admin (http://localhost:1337/admin)
2. Go to **Content Manager** → **Chef Profile**
3. Click **Create new entry**
4. Fill in:
   - **Name:** Chef Gordon
   - **Bio:** Professional chef with 10 years experience
   - **Cuisine Types:** Italian, French
   - **Price Per Hour:** 500
   - **Rating:** 4.8
   - **Is Available:** Yes
   - **Is Approved:** Yes
5. Click **Save** and **Publish**

### Test User Registration

1. In the web app (http://localhost:8081)
2. Click "Register"
3. Create an account
4. Login with your credentials
5. Browse chefs, create bookings, test chat

## Troubleshooting

### Port Already in Use

If you see "Port 1337 is already in use":

```bash
# Find and kill the process
lsof -ti:1337 | xargs kill -9

# Or use a different port
cd backend
PORT=1338 pnpm develop
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Backend Won't Start

```bash
# Check if .env file exists
ls -la backend/.env

# Check for syntax errors
cat backend/.env

# Try building first
cd backend
pnpm build
pnpm develop
```

### Web App Shows Blank Screen

1. Open browser console (F12)
2. Check for errors
3. Verify backend is running
4. Check EXPO_PUBLIC_API_URL in mobile/.env

### Can't Connect to Backend from Mobile App

Make sure:
- Backend is running on http://localhost:1337
- Mobile .env has correct API URL
- No firewall blocking localhost connections

## Development Workflow

### Making Changes

**Backend Changes:**
- Edit files in `backend/src/`
- Backend auto-reloads on save

**Mobile Changes:**
- Edit files in `mobile/`
- Web app auto-refreshes on save

### Viewing Logs

**Backend Logs:**
- Check terminal where `pnpm dev:backend` is running
- Or: http://localhost:1337/admin → Settings → Logs

**Mobile Logs:**
- Browser console (F12 → Console tab)
- Terminal where `pnpm dev:mobile` is running

### Database Management

**View/Edit Data:**
- Go to http://localhost:1337/admin
- Content Manager → Choose content type
- Create, edit, or delete entries

**Reset Database:**
```bash
cd backend
rm -rf .tmp/data.db
pnpm develop  # Will create fresh database
```

## Quick Commands Reference

```bash
# Install dependencies
pnpm install

# Start everything (requires 2 terminals)
pnpm dev:backend    # Terminal 1
pnpm dev:mobile     # Terminal 2 (press 'w' for web)

# Or use separate commands
pnpm dev            # Starts both (experimental)

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Stop all processes
# Press Ctrl+C in each terminal
```

## Browser Compatibility

Tested and working on:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Recommended Browser Extensions

For better development experience:
- React Developer Tools
- Redux DevTools (if using Redux)
- JSON Formatter

## Next Steps

Once everything is running:

1. **Explore the Admin Panel:**
   - Create chef profiles
   - Set up content
   - Configure permissions

2. **Test the Mobile App:**
   - Register users
   - Browse chefs
   - Create bookings
   - Test chat functionality

3. **Customize:**
   - Update UI components
   - Add your branding
   - Configure features

4. **Deploy:**
   - Follow DEPLOYMENT_CHECKLIST.md
   - Set up production servers
   - Submit to app stores

## Need Help?

- **Setup Issues:** Check SETUP.md
- **Development:** Check DEVELOPMENT.md
- **Deployment:** Check DEPLOYMENT_CHECKLIST.md
- **Payment Integration:** Check backend/PAYMOB_SETUP.md

---

## TL;DR - Fastest Way to Start

```bash
# 1. Install Node.js 20 from https://nodejs.org/

# 2. Install pnpm
npm install -g pnpm

# 3. Install dependencies
cd /Users/ebrahimsoliman/apps/chefly
pnpm install

# 4. Configure (use SQLite for quick start)
cp backend/.env.example backend/.env
# Edit backend/.env: Set DATABASE_CLIENT=sqlite

# 5. Start backend (Terminal 1)
pnpm dev:backend

# 6. Create admin at http://localhost:1337/admin

# 7. Start mobile web (Terminal 2)
cd mobile && pnpm web

# 8. Open http://localhost:8081 in browser

# 🎉 Done! Start exploring!
```

---

**Last Updated:** October 24, 2025

**Status:** Ready for local development ✅

