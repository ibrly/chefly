# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the `backend` directory with these variables:

```bash
# Database
DATABASE_URL="postgresql://chefly:chefly_password@localhost:5432/chefly"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# Service Ports
PORT_GATEWAY=3000
PORT_AUTH=3001
PORT_USER=3002
PORT_BOOKING=3003
PORT_CHAT=3004
PORT_PAYMENT=3005
PORT_NOTIFICATION=3006

# Client URL (for CORS)
CLIENT_URL="http://localhost:8081"
SERVER_URL="http://localhost:3000"

# Paymob Payment Gateway
PAYMOB_API_KEY="your-paymob-api-key"
PAYMOB_INTEGRATION_ID="your-integration-id"
PAYMOB_IFRAME_ID="your-iframe-id"
PAYMOB_HMAC_SECRET="your-hmac-secret"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_APP_ID=""
FACEBOOK_APP_SECRET=""

# Node Environment
NODE_ENV="development"
```

## Quick Setup

```bash
cd backend
cp ENV_SETUP.md .env
# Edit .env with your actual values
```

## For Local Development

1. **Start Docker services:**

   ```bash
   docker-compose up -d
   ```

2. **Create `.env` file** with the variables above

3. **Generate Prisma Client:**

   ```bash
   pnpm prisma:generate
   ```

4. **Run migrations:**

   ```bash
   pnpm prisma:migrate dev
   ```

5. **Start all services:**

   ```bash
   pnpm dev
   ```

## For CI/CD

The GitHub Actions workflow sets these automatically:

- `DATABASE_URL` → Test PostgreSQL database
- `REDIS_URL` → Test Redis instance
- `JWT_SECRET` → Test secrets

## Production

⚠️ **IMPORTANT:** Change all secret values before deploying to production!

- Generate strong JWT secrets (use `openssl rand -base64 32`)
- Use real Paymob credentials
- Set up OAuth app credentials
- Use secure database passwords
