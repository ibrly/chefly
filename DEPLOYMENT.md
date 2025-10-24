# Chefly Deployment Guide

This guide covers deploying the Chefly application to a VPS and building mobile apps.

## Prerequisites

### VPS Requirements
- Ubuntu 20.04 or later
- Node.js 20.x or later
- pnpm 9.x or later
- PM2 (for process management)
- Nginx (for web hosting)
- PostgreSQL (for production database)

### GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

1. **VPS Deployment Secrets:**
   - `VPS_HOST` - Your VPS IP address or domain
   - `VPS_USERNAME` - SSH username (e.g., ubuntu, root)
   - `VPS_SSH_KEY` - Private SSH key for authentication
   - `VPS_PORT` - SSH port (usually 22)

2. **Expo/EAS Secrets:**
   - `EXPO_TOKEN` - Expo access token (get from https://expo.dev/accounts/[account]/settings/access-tokens)

## VPS Setup

### 1. Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
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
```

### 2. Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE chefly;
CREATE USER chefly_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE chefly TO chefly_user;
\q
```

### 3. Configure Environment Variables

Create `/var/www/chefly-backend/.env`:

```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate secure values)
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
JWT_SECRET=your_jwt_secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=chefly
DATABASE_USERNAME=chefly_user
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=false

# Paymob
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_SECRET_KEY=your_paymob_secret_key
PAYMOB_INTEGRATION_ID=your_paymob_integration_id

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
APPLE_PRIVATE_KEY=your_apple_private_key
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# CORS
CLIENT_URL=https://yourdomain.com
```

### 4. Nginx Configuration

Create `/etc/nginx/sites-available/chefly-backend`:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

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
}
```

Create `/etc/nginx/sites-available/chefly-web`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/chefly-web/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable sites:

```bash
sudo ln -s /etc/nginx/sites-available/chefly-backend /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/chefly-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL Certificate (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 6. PM2 Setup

```bash
cd /var/www/chefly-backend
pm2 start npm --name "chefly-backend" -- start
pm2 save
pm2 startup
```

## Deployment Process

### Automatic Deployment (via GitHub Actions)

1. Push to `main` branch triggers automatic deployment
2. GitHub Actions will:
   - Run linting and tests
   - Build the application
   - Deploy to VPS via SSH
   - Restart services

### Manual Deployment

```bash
# On your local machine
cd /Users/ebrahimsoliman/apps/chefly

# Pull latest changes on VPS
ssh user@vps "cd /var/www/chefly-backend && git pull"

# Install dependencies and restart
ssh user@vps "cd /var/www/chefly-backend && pnpm install --prod && pm2 restart chefly-backend"
```

## Mobile App Deployment

### Web Version

The web version is automatically deployed when you push to `main`. Access it at `https://yourdomain.com`

### iOS App

1. Configure EAS in `mobile/eas.json`
2. Run manually or via GitHub Actions workflow dispatch
3. Submit to App Store Connect

```bash
cd mobile
eas build --platform ios
eas submit --platform ios
```

### Android App

1. Configure EAS in `mobile/eas.json`
2. Run manually or via GitHub Actions workflow dispatch
3. Submit to Google Play Console

```bash
cd mobile
eas build --platform android
eas submit --platform android
```

## Monitoring and Maintenance

### View Logs

```bash
# Backend logs
pm2 logs chefly-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backup Database

```bash
# Create backup
pg_dump -U chefly_user -h localhost chefly > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U chefly_user -h localhost chefly < backup_20240101.sql
```

### Update Application

```bash
# Pull latest code
cd /var/www/chefly-backend
git pull

# Install dependencies
pnpm install --prod

# Run migrations (if any)
pnpm strapi migrations:run

# Restart
pm2 restart chefly-backend
```

## Troubleshooting

### Backend Not Starting

Check PM2 logs:
```bash
pm2 logs chefly-backend
```

Check environment variables:
```bash
cd /var/www/chefly-backend
cat .env
```

### Database Connection Issues

Test PostgreSQL connection:
```bash
psql -U chefly_user -h localhost -d chefly
```

### Nginx Issues

Test configuration:
```bash
sudo nginx -t
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

## Security Best Practices

1. Use strong passwords for database and JWT secrets
2. Keep SSL certificates up to date
3. Regularly update system packages
4. Use firewall (UFW) to restrict ports
5. Enable fail2ban for SSH protection
6. Regular database backups
7. Monitor server resources

## Support

For issues or questions, refer to:
- Strapi Documentation: https://docs.strapi.io
- Expo Documentation: https://docs.expo.dev
- React Native Documentation: https://reactnative.dev

