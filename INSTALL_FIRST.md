# INSTALL THESE FIRST! 

## You MUST install Node.js before anything else will work.

### Step 1: Install Node.js 20

**Option A - Using Homebrew (Recommended for macOS):**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js 20
brew install node@20

# Verify installation
node --version
npm --version
```

**Option B - Download Installer:**
1. Go to https://nodejs.org/
2. Download the "LTS" version (should be 20.x.x)
3. Run the installer
4. Follow the installation wizard
5. Restart your terminal

### Step 2: Verify Installation

Open a NEW terminal window and run:
```bash
node --version
# Should show: v20.x.x

npm --version
# Should show: 10.x.x
```

### Step 3: Run the Backend Setup Script

Once Node.js is installed, run:
```bash
cd /Users/ebrahimsoliman/apps/chefly
./setup-backend.sh
```

This will:
- Remove the problematic backend
- Create a fresh Strapi backend using the official CLI
- Install the correct versions automatically

### Step 4: Start Development

After the script completes:
```bash
# Start backend
cd backend
npm run develop

# In a NEW terminal, start mobile
cd /Users/ebrahimsoliman/apps/chefly/mobile
npm start
# Press 'w' for web
```

---

## Why This Approach?

✅ Uses official Strapi CLI (no version guessing)  
✅ Gets correct versions automatically  
✅ Clean install  
✅ No dependency conflicts  

---

**After you install Node.js, come back and run: `./setup-backend.sh`**

