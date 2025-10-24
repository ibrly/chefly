# Paymob Payment Gateway Setup Guide

This guide will help you set up Paymob payment integration for Chefly.

## Step 1: Create Paymob Account

1. Visit https://paymob.com
2. Click "Sign Up" or "Create Account"
3. Fill in your business information
4. Verify your email address
5. Complete the KYC (Know Your Customer) process
6. Wait for account approval (usually 1-2 business days)

## Step 2: Get API Credentials

Once your account is approved:

### 2.1 Get API Key

1. Log in to https://accept.paymob.com/portal2/en/login
2. Go to **Settings** in the sidebar
3. Click on **Account Info**
4. Find the "API Key" section
5. Click **View** to reveal your API Key
6. Copy and save it securely

### 2.2 Get Integration ID

1. In the Paymob dashboard, go to **Developers**
2. Click on **Payment Integrations**
3. You'll see a list of payment integrations
4. Copy the **ID** number next to your desired integration (e.g., "Card Payment")
5. Save this Integration ID

### 2.3 Get Iframe ID

1. Still in **Developers** section
2. Click on **Iframes**
3. Copy the number associated with your iframe
4. Save this Iframe ID

### 2.4 Get HMAC Secret

1. Go back to **Settings** → **Account Info**
2. Find the "HMAC" section
3. Copy the HMAC key
4. Save this HMAC Secret

## Step 3: Configure Backend

Add your Paymob credentials to `backend/.env`:

```env
# Paymob Integration
PAYMOB_API_KEY=your_actual_api_key_here
PAYMOB_INTEGRATION_ID=your_actual_integration_id_here
PAYMOB_IFRAME_ID=your_actual_iframe_id_here
PAYMOB_HMAC_SECRET=your_actual_hmac_secret_here
```

**Example (with fake values):**
```env
PAYMOB_API_KEY=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5
PAYMOB_INTEGRATION_ID=123456
PAYMOB_IFRAME_ID=789012
PAYMOB_HMAC_SECRET=A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
```

## Step 4: Configure Webhooks in Paymob

1. In Paymob dashboard, go to **Developers** → **Webhooks**
2. Click **Add Webhook**
3. Configure:
   - **URL**: `https://api.yourdomain.com/api/payments/webhook`
     (Replace with your actual backend URL)
   - **Events**: Select "Transaction Response"
4. Save the webhook

**For Development:**
- Use ngrok or similar tool to expose your local server
- Example: `https://abc123.ngrok.io/api/payments/webhook`

## Step 5: Test in Sandbox Mode

Paymob provides test cards for sandbox testing:

### Test Cards

**Successful Transaction:**
- Card Number: `5123 4567 8901 2346`
- CVV: `123`
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Failed Transaction:**
- Card Number: `4000 0000 0000 0002`
- CVV: `123`
- Expiry: Any future date
- Name: Any name

**3D Secure (OTP Required):**
- Card Number: `5111 1111 1111 1118`
- CVV: `123`
- Expiry: Any future date
- OTP: `123456`

## Step 6: Test Payment Flow

### 6.1 Create a Test Booking

1. Start your backend: `pnpm dev:backend`
2. Start your mobile app: `pnpm dev:mobile`
3. Login as a client
4. Create a booking with a chef
5. Click "Pay Now"

### 6.2 Complete Payment

1. Payment WebView will open
2. Enter test card details
3. Complete the payment
4. You should be redirected back to the app
5. Booking status should update to "confirmed"

### 6.3 Verify in Paymob Dashboard

1. Go to **Transactions** in Paymob dashboard
2. You should see your test transaction
3. Check the status and details

## Step 7: Go Live

### 7.1 Switch to Production

1. In Paymob dashboard, request to go live
2. Complete any additional verification required
3. Paymob will activate your production account

### 7.2 Production Credentials

1. Get new production credentials (API Key, Integration ID, etc.)
2. Update your production backend `.env` file
3. Update webhook URL to production domain
4. Test with real cards (small amounts first)

### 7.3 Production Checklist

- ✅ Production API credentials configured
- ✅ Webhook URL points to production server
- ✅ HTTPS enabled on your server
- ✅ Test with real card (small amount)
- ✅ Verify booking confirmation flow
- ✅ Check email notifications work
- ✅ Monitor first few real transactions

## Payment Flow Overview

```
1. Client creates booking
2. Client clicks "Pay Now"
3. Mobile app calls /api/payments/intent
4. Backend:
   - Authenticates with Paymob
   - Registers order
   - Generates payment key
   - Returns iframe URL
5. Mobile app opens WebView with iframe URL
6. Client enters card details in Paymob iframe
7. Paymob processes payment
8. Paymob sends webhook to backend
9. Backend verifies webhook signature
10. Backend updates payment status
11. Backend updates booking status
12. Backend sends notification to chef
13. Client sees success message
```

## Troubleshooting

### Error: "Invalid API Key"
- Check your API key is copied correctly
- Make sure there are no spaces or line breaks
- Verify you're using the correct environment (sandbox vs production)

### Error: "Invalid Integration ID"
- Verify the Integration ID matches your payment integration
- Check you copied the number correctly

### Webhook Not Received
- Verify webhook URL is accessible from internet
- Check firewall settings
- Use ngrok for local development
- Check webhook logs in Paymob dashboard

### Payment Successful but Booking Not Confirmed
- Check backend logs for webhook processing errors
- Verify HMAC signature verification is working
- Check database for payment record
- Ensure notification service is working

### 3D Secure Issues
- Make sure WebView allows JavaScript
- Enable DOM storage in WebView
- Check browser/WebView compatibility

## Security Best Practices

1. **Never expose API keys in mobile app**
   - Always call backend to create payment intent
   - Backend should handle all Paymob API calls

2. **Verify webhook signatures**
   - Always verify HMAC signatures
   - Reject webhooks with invalid signatures

3. **Use HTTPS**
   - Always use HTTPS in production
   - Paymob may reject HTTP webhook URLs

4. **Log everything**
   - Log all payment attempts
   - Log webhook calls
   - Monitor for suspicious activity

5. **Handle errors gracefully**
   - Show user-friendly error messages
   - Retry failed payments
   - Provide support contact info

## Support

### Paymob Support
- Email: support@paymob.com
- Phone: Check website for current number
- Dashboard: Use chat support button

### Documentation
- API Docs: https://docs.paymob.com
- Integration Guide: Check Paymob dashboard under "Developers"

### Chefly Support
- Check `DEVELOPMENT.md` for development issues
- Check backend logs: `pm2 logs chefly-backend`
- Check database for payment records

## Paymob Fees

Check your contract with Paymob for exact fees. Typical fees:
- 2.5% + 1 EGP per successful transaction
- No setup fees
- No monthly fees

**Remember to account for these fees in your pricing!**

---

**Note:** This guide uses real Paymob API documentation. Always refer to the official Paymob documentation for the most up-to-date information.

