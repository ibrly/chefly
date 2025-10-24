# Chefly Admin Panel Guide

## Accessing the Admin Panel

URL: `http://localhost:1337/admin` (development)  
URL: `https://api.yourdomain.com/admin` (production)

## First Time Setup

1. On first run, create your admin account
2. Save the credentials securely
3. You'll be redirected to the dashboard

## User Management

### Creating Roles

1. Go to **Settings** → **USERS & PERMISSIONS PLUGIN** → **Roles**

2. **Client Role:**
   - Click "Add new role"
   - Name: `client`
   - Description: `Client users who book chefs`
   - Permissions:
     - ✅ Booking: create, find, findOne, update (own)
     - ✅ Message: create, find, findOne
     - ✅ Review: create, find, findOne
     - ✅ Favorite: create, find, delete (own)
     - ✅ Chef-profile: find, findOne
   - Save

3. **Chef Role:**
   - Click "Add new role"
   - Name: `chef`
   - Description: `Chef users who offer services`
   - Permissions:
     - ✅ Chef-profile: update (own), find, findOne
     - ✅ Booking: find, findOne, update (own)
     - ✅ Message: create, find, findOne
     - ✅ Review: find, findOne
   - Save

### Managing Users

**View All Users:**
- Content Manager → User (from Users & Permissions plugin)
- See all registered users

**Approve/Block Users:**
- Click on a user
- Toggle `Blocked` field
- Save

## Chef Management

### Approve New Chefs

1. Go to **Content Manager** → **Chef Profile**
2. You'll see all chef profiles
3. Click on a pending chef
4. Review their:
   - Bio and specialties
   - Years of experience
   - Certifications (uploaded files)
   - Portfolio images
5. Set `isApproved` to `true` if approved
6. Save

### Chef Profile Fields

- **User:** Link to user account
- **Bio:** Chef's description
- **Specialties:** JSON array of specialties
- **Cuisine Types:** JSON array of cuisine types
- **Years of Experience:** Number
- **Hourly Rate:** Decimal (in EGP)
- **Profile Photo:** Single image
- **Portfolio Images:** Multiple images
- **Certifications:** Multiple files/images
- **Average Rating:** Auto-calculated
- **Total Bookings:** Auto-incremented
- **Location, City, Governorate:** Text fields
- **Is Available:** Boolean (chef sets this)
- **Is Approved:** Boolean (admin sets this)

## Booking Management

### View All Bookings

1. Go to **Content Manager** → **Booking**
2. Filter by status:
   - Pending
   - Confirmed
   - In Progress
   - Completed
   - Cancelled

### Booking Lifecycle

```
Pending → Confirmed → In Progress → Completed
                  ↓
              Cancelled
```

### Handle Disputes

1. Find the booking
2. Review booking details
3. Check messages between client and chef
4. View payment status
5. Take action:
   - Cancel booking
   - Refund payment
   - Contact parties

## Reviews Management

### Moderate Reviews

1. Go to **Content Manager** → **Review**
2. Review comments for:
   - Inappropriate content
   - Fake reviews
   - Spam
3. Set `isApproved` to:
   - `true` - Show review publicly
   - `false` - Hide review

### Review Fields

- **Booking:** Link to booking
- **Client:** Who wrote the review
- **Chef:** Who received the review
- **Rating:** 1-5 stars
- **Comment:** Review text
- **Is Approved:** Moderation flag

## Messages

### View Conversations

1. Go to **Content Manager** → **Message**
2. Filter by:
   - Conversation ID
   - Sender
   - Receiver
3. View message history

**Note:** Real-time messages are also stored here

## Payments

### Track Payments

1. Go to **Content Manager** → **Payment**
2. View all transactions:
   - Amount
   - Status (pending, completed, failed, refunded)
   - Paymob Transaction ID
   - Payment method

### Payment Status

- **Pending:** Awaiting payment
- **Completed:** Payment successful
- **Failed:** Payment failed
- **Refunded:** Money returned to client

## Favorites

### View User Favorites

1. Go to **Content Manager** → **Favorite**
2. See which users favorited which chefs
3. Useful for analytics

## Settings

### Update Admin Profile

1. Click your avatar (top right)
2. Select "Profile"
3. Update name, email, password
4. Save

### Configure OAuth Providers

1. Go to **Settings** → **USERS & PERMISSIONS PLUGIN** → **Providers**
2. Enable and configure:
   - **Google:** Add Client ID and Secret
   - **Apple:** Add Client ID, Team ID, Key ID, Private Key
   - **Facebook:** Add App ID and Secret
3. Save

**Get OAuth Credentials:**
- Google: https://console.cloud.google.com
- Apple: https://developer.apple.com
- Facebook: https://developers.facebook.com

### Configure Email

1. Go to **Settings** → **EMAIL PLUGIN**
2. Choose provider (SendGrid, Mailgun, etc.)
3. Add API keys
4. Test email sending

## Dashboard Statistics (Future Enhancement)

Currently, Strapi provides basic content counts. For custom analytics:

1. Total Users
2. Active Chefs
3. Total Bookings
4. Revenue
5. Average Rating

These can be added with custom controllers.

## API Tokens

### Create API Tokens

1. Go to **Settings** → **API TOKENS**
2. Click "Create new API Token"
3. Set:
   - Name: e.g., "Mobile App"
   - Token type: Read-only or Full access
   - Token duration: Unlimited or custom
4. Save and copy the token
5. Use in your mobile app or integrations

## Webhooks

### Setup Webhooks

1. Go to **Settings** → **WEBHOOKS**
2. Click "Create new webhook"
3. Configure:
   - Name: e.g., "Booking Created"
   - URL: Your webhook endpoint
   - Events: Select triggers
   - Headers: Add authentication
4. Save

**Use Cases:**
- Send email when booking is created
- Notify external systems
- Sync with other databases
- Trigger analytics

## Backup & Export

### Export Data

1. Go to **Settings** → **TRANSFER TOKENS**
2. Create a transfer token
3. Use Strapi CLI to export:
   ```bash
   strapi transfer --to destination
   ```

### Database Backup

**Development (SQLite):**
```bash
cp backend/.tmp/data.db backup_$(date +%Y%m%d).db
```

**Production (PostgreSQL):**
```bash
pg_dump -U username dbname > backup.sql
```

## Security Best Practices

1. **Strong Password:** Use a strong admin password
2. **2FA:** Enable two-factor authentication (via plugin)
3. **Regular Updates:** Keep Strapi updated
4. **Limit Access:** Only give admin access to trusted people
5. **API Tokens:** Use read-only tokens when possible
6. **HTTPS:** Always use HTTPS in production
7. **Backup:** Regular database backups

## Common Tasks

### Add a Test Chef

1. Create a user account (or use existing)
2. Go to **Content Manager** → **Chef Profile**
3. Click "Create new entry"
4. Fill in:
   - User: Select the user
   - Bio: Write a description
   - Specialties: `["Italian", "Pasta"]`
   - Cuisine Types: `["Italian", "Mediterranean"]`
   - Years of Experience: 5
   - Hourly Rate: 200
   - Location: Cairo, Egypt
   - Upload photos
5. Set `isApproved` to `true`
6. Save

### Handle Booking Dispute

1. Find the booking in **Bookings**
2. Check the **Messages** between parties
3. Review the **Chef Profile**
4. Check **Payment** status
5. Take action:
   - Contact both parties
   - Cancel booking if needed
   - Process refund
   - Document the issue

### Ban a User

1. Go to **Users** (from Users & Permissions)
2. Find the user
3. Set `Blocked` to `true`
4. User can no longer log in
5. Optionally delete their data

## Troubleshooting

### Can't Login

- Check if admin JWT secret is configured
- Verify database connection
- Check browser console for errors
- Clear browser cache

### Content Not Saving

- Check file permissions
- Verify database is running
- Check Strapi logs
- Ensure required fields are filled

### Images Not Uploading

- Check file size limits
- Verify upload folder permissions
- Check available disk space
- Review CORS settings

## Support

- Strapi Docs: https://docs.strapi.io
- Strapi Forum: https://forum.strapi.io
- Discord: https://discord.strapi.io

---

**Remember:** The admin panel is powerful. Always be careful when:
- Deleting content
- Changing permissions
- Blocking users
- Modifying bookings

