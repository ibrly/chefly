# Chefly Deployment Checklist

This comprehensive checklist will guide you through deploying the Chefly platform to production.

## Pre-Deployment Requirements

### 1. Infrastructure Access ✅ / ❌
- [ ] VPS Server (DigitalOcean, AWS EC2, Linode, etc.)
  - Minimum specs: 2GB RAM, 2 CPU cores, 50GB storage
  - Ubuntu 22.04 LTS recommended
- [ ] Domain name purchased (e.g., chefly.app)
- [ ] SSH access to server
- [ ] Root or sudo privileges

### 2. External Services ✅ / ❌
- [ ] Paymob account created and KYC approved
- [ ] Paymob production API credentials obtained
- [ ] PostgreSQL database (can be on same VPS or managed service)
- [ ] SSL certificate (Let's Encrypt free, or purchased)
- [ ] Email service (optional: SendGrid, Mailgun, etc.)

### 3. Mobile App Publishing ✅ / ❌
- [ ] Apple Developer Account ($99/year)
- [ ] Google Play Developer Account ($25 one-time)
- [ ] Expo Account (free, create at expo.dev)
- [ ] EAS CLI installed (`npm install -g eas-cli`)

### 4. GitHub & CI/CD ✅ / ❌
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Actions enabled
- [ ] GitHub Secrets configured

---

## Phase 1: Backend Deployment

### Step 1: Prepare VPS Server

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Configure PostgreSQL

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE chefly;
CREATE USER cheflyuser WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE chefly TO cheflyuser;
ALTER DATABASE chefly OWNER TO cheflyuser;
\q
```

### Step 3: Clone and Configure Backend

```bash
# Create app directory
sudo mkdir -p /var/www/chefly
sudo chown $USER:$USER /var/www/chefly

# Clone repository
cd /var/www
git clone https://github.com/yourusername/chefly.git
cd chefly

# Install dependencies
pnpm install

# Create production .env file
cd backend
nano .env
```

**Backend .env (Production):**
```env
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# App URLs
APP_KEYS=<generate with: openssl rand -base64 32>
API_TOKEN_SALT=<generate with: openssl rand -base64 32>
ADMIN_JWT_SECRET=<generate with: openssl rand -base64 32>
TRANSFER_TOKEN_SALT=<generate with: openssl rand -base64 32>
JWT_SECRET=<generate with: openssl rand -base64 32>

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=chefly
DATABASE_USERNAME=cheflyuser
DATABASE_PASSWORD=your-secure-password
DATABASE_SSL=false

# URLs
CLIENT_URL=https://app.chefly.app
SERVER_URL=https://api.chefly.app

# Paymob Production
PAYMOB_API_KEY=your_production_api_key
PAYMOB_INTEGRATION_ID=your_production_integration_id
PAYMOB_IFRAME_ID=your_production_iframe_id
PAYMOB_HMAC_SECRET=your_production_hmac_secret

# Optional: Email
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USERNAME=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
```

### Step 4: Build and Start Backend

```bash
# Build backend
cd /var/www/chefly/backend
pnpm build

# Start with PM2
pm2 start npm --name "chefly-backend" -- run start

# Save PM2 config
pm2 save
pm2 startup

# Check status
pm2 status
pm2 logs chefly-backend
```

### Step 5: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/chefly-api
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.chefly.app;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Increase upload size for images
    client_max_body_size 50M;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/chefly-api /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 6: Configure SSL with Let's Encrypt

```bash
# Get SSL certificate
sudo certbot --nginx -d api.chefly.app

# Test auto-renewal
sudo certbot renew --dry-run
```

### Step 7: Create Admin User

```bash
# Visit https://api.chefly.app/admin
# Register first admin user
# This automatically becomes the super admin
```

---

## Phase 2: Configure Paymob Webhooks

### Step 1: Update Webhook URL

1. Log in to Paymob dashboard: https://accept.paymob.com/portal2
2. Go to **Developers** → **Webhooks**
3. Update webhook URL to: `https://api.chefly.app/api/payments/webhook`
4. Ensure "Transaction Response" event is selected
5. Save changes

### Step 2: Test Webhook

```bash
# Monitor backend logs
pm2 logs chefly-backend --lines 100

# Create a test booking and payment
# Check if webhook is received
```

---

## Phase 3: Mobile App Build & Deployment

### Step 1: Set Up EAS

```bash
# Login to Expo
eas login

# Configure project
cd mobile
eas build:configure
```

### Step 2: Update App Config

Edit `mobile/app.config.ts`:

```typescript
export default {
  // ... existing config
  extra: {
    eas: {
      projectId: "your-actual-project-id-from-expo",
    },
    apiUrl: "https://api.chefly.app",
  },
};
```

### Step 3: Create Production Build

**For iOS:**
```bash
# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile production

# This will:
# 1. Prompt for Apple Developer credentials
# 2. Create signing certificates
# 3. Build IPA file
# 4. Upload to EAS servers
```

**For Android:**
```bash
# Build for Android
eas build --platform android --profile production

# This will:
# 1. Create APK/AAB file
# 2. Sign with your keystore
# 3. Upload to EAS servers
```

### Step 4: Submit to App Stores

**iOS (App Store):**
```bash
# Submit to App Store
eas submit --platform ios --latest

# Or manually:
# 1. Download IPA from EAS
# 2. Open Transporter app
# 3. Upload IPA
# 4. Complete App Store Connect listing
```

**Android (Google Play):**
```bash
# Submit to Google Play
eas submit --platform android --latest

# Or manually:
# 1. Download AAB from EAS
# 2. Go to Google Play Console
# 3. Create new app release
# 4. Upload AAB
# 5. Complete store listing
```

---

## Phase 4: Web Deployment (Optional)

### Option A: Deploy with Netlify/Vercel

```bash
# Build web version
cd mobile
npx expo export --platform web

# The static files will be in `dist/` folder
# Upload to Netlify or Vercel
```

### Option B: Serve from Same VPS

```bash
# Build web version
cd /var/www/chefly/mobile
pnpm build:web

# Configure Nginx for web app
sudo nano /etc/nginx/sites-available/chefly-web
```

**Nginx Config for Web:**
```nginx
server {
    listen 80;
    server_name app.chefly.app;
    root /var/www/chefly/mobile/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable and SSL
sudo ln -s /etc/nginx/sites-available/chefly-web /etc/nginx/sites-enabled/
sudo certbot --nginx -d app.chefly.app
sudo systemctl restart nginx
```

---

## Phase 5: Configure CI/CD

### Step 1: Create GitHub Secrets

Go to GitHub repo → Settings → Secrets → Actions

Add the following secrets:

```
VPS_HOST=your-server-ip
VPS_USERNAME=your-ssh-username
VPS_SSH_KEY=<paste your private SSH key>
VPS_PORT=22
VPS_PROJECT_PATH=/var/www/chefly
```

### Step 2: Enable GitHub Actions

The workflows are already in `.github/workflows/`:
- `ci.yml` - Runs on every push (lint, test, build)
- `deploy.yml` - Runs on push to `main` branch

### Step 3: Test Deployment

```bash
# Make a change and push to main
git add .
git commit -m "test: trigger deployment"
git push origin main

# Watch GitHub Actions tab for progress
# SSH into server and check:
pm2 logs chefly-backend
```

---

## Phase 6: Post-Deployment Tasks

### 1. Set Up Monitoring

```bash
# Install PM2 monitoring (optional)
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### 2. Set Up Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-chefly.sh
```

**Backup Script:**
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/chefly"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U cheflyuser chefly > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/chefly/backend/public/uploads

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-chefly.sh

# Add to cron (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-chefly.sh
```

### 3. Configure Firewall

```bash
# Enable UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### 4. Set Up Monitoring (Optional)

Consider setting up:
- **Uptime monitoring:** UptimeRobot, Pingdom
- **Error tracking:** Sentry
- **Analytics:** Google Analytics, Mixpanel
- **Performance:** New Relic, DataDog

---

## Testing Checklist

### Backend API
- [ ] https://api.chefly.app/admin loads
- [ ] Can create/edit content in Strapi admin
- [ ] API endpoints respond correctly
- [ ] Webhooks from Paymob work
- [ ] File uploads work
- [ ] Socket.io connections work

### Mobile Apps
- [ ] iOS app downloads from App Store
- [ ] Android app downloads from Google Play
- [ ] Login/registration works
- [ ] Can browse chefs
- [ ] Can create bookings
- [ ] Chat works in real-time
- [ ] Payments process successfully
- [ ] Push notifications arrive
- [ ] Images load correctly

### Web App (if deployed)
- [ ] https://app.chefly.app loads
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] All features work
- [ ] No console errors

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
pm2 logs chefly-backend

# Check database connection
psql -U cheflyuser -d chefly -h localhost

# Restart
pm2 restart chefly-backend
```

### Nginx 502 Bad Gateway
```bash
# Check if backend is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart all
sudo systemctl restart nginx
```

### Payment webhook not working
- Verify webhook URL in Paymob dashboard
- Check firewall allows external POST requests
- Monitor logs: `pm2 logs chefly-backend | grep webhook`
- Test with Paymob sandbox

### Mobile app build fails
- Check EAS credentials
- Verify app.json configuration
- Review build logs on Expo dashboard
- Ensure all dependencies are compatible

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor PM2 logs for errors
- Check server resources (CPU, RAM, disk)

**Weekly:**
- Review Strapi admin logs
- Check payment transaction logs
- Monitor user growth and activity

**Monthly:**
- Update Node.js packages: `pnpm update`
- Review and update Strapi plugins
- Check SSL certificate renewal
- Review backup integrity

### Updates

```bash
# Update backend dependencies
cd /var/www/chefly/backend
pnpm update

# Rebuild and restart
pnpm build
pm2 restart chefly-backend

# Update mobile app
cd /var/www/chefly/mobile
pnpm update
# Create new build and submit to stores
```

---

## Security Checklist

- [ ] All secrets in environment variables (not in code)
- [ ] SSL certificates installed and auto-renewing
- [ ] Firewall enabled and configured
- [ ] SSH key authentication only (disable password auth)
- [ ] Regular backups configured
- [ ] Database password is strong
- [ ] Strapi admin has strong password
- [ ] Rate limiting enabled in Strapi
- [ ] CORS properly configured
- [ ] API tokens secured
- [ ] Paymob webhooks verify HMAC signatures

---

## Support & Resources

- **Expo Documentation:** https://docs.expo.dev/
- **Strapi Documentation:** https://docs.strapi.io/
- **Paymob Documentation:** https://docs.paymob.com/
- **PM2 Documentation:** https://pm2.keymetrics.io/
- **Nginx Documentation:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/

---

## Cost Estimation

### Monthly Operating Costs

- **VPS Server:** $10-30/month (DigitalOcean, Linode, Vultr)
- **Domain Name:** ~$12/year (~$1/month)
- **SSL Certificate:** Free (Let's Encrypt)
- **Paymob Fees:** 2.5% + 1 EGP per transaction
- **Apple Developer:** $99/year (~$8/month)
- **Google Play:** $25 one-time
- **Monitoring (optional):** $0-50/month

**Estimated Total:** $20-50/month + transaction fees

### Scaling Costs

As you grow:
- Upgrade VPS to handle more traffic
- Consider managed PostgreSQL service
- Add CDN for static assets (Cloudflare)
- Upgrade Expo plan for more builds

---

**Last Updated:** October 24, 2025

**Status:** Ready for deployment with external resources

Good luck with your launch! 🚀

