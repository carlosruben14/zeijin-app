# Email Setup Guide for Ask Us Submissions

## Quick Start (2 minutes)

### Step 1: Get Your Gmail App Password

1. Go to **myaccount.google.com** and sign in
2. Click **Security** on the left (you may need to enable 2-Step Verification first)
3. Scroll to **App passwords** (only shows if 2-Step Verification is ON)
4. Select: **Mail** and **Windows Computer**
5. Google will generate a 16-character password like: `abcd efgh ijkl mnop`

### Step 2: Update .env.local

Open `.env.local` in the project root and replace:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=your-email@gmail.com
```

**Copy the 16 characters exactly (remove spaces)**

### Step 3: Restart Server

Stop the current `node server.js` process (Ctrl+C) and run:

```bash
node server.js
```

You should see:
```
Email service connected successfully
Ask Us Backend Server running on http://localhost:3001
```

## How It Works

When someone submits a form via the button:

1. Submission saved to `data/submissions.json`
2. Email sent to your inbox with full details
3. **Reply to the email** - your response goes back to the user's email address (auto reply-to configured)

## Email Format

You'll receive emails like:

```
From: your-email@gmail.com
To: your-email@gmail.com
Reply-To: carlos@email.com
Subject: [LOW] Game add - Game Request

---

Name: carlos
Email: carlos@email.com
Category: Game Request
Priority: LOW
Subject: Game add

Message:
add ka clash of clan

---

Submitted: 4/14/2026, 10:22:12 AM
Submission ID: 1776133332273

Reply directly to this email to respond to the user.
```

## Troubleshooting

### "Email service not available"

**Problem:** App password not configured correctly
**Solution:**
1. Remove spaces from the 16-character password
2. Make sure 2-Step Verification is enabled on Gmail
3. Regenerate App password if needed

### "Gmail says 'Less secure apps'"

**Problem:** Gmail is blocking the connection
**Solution:**
- This is expected! Use **App Passwords** instead (see Step 1 above)
- App Passwords are secure and Google-approved

### "No email received"

**Problem:** Email configuration issue
**Solution:**
1. Check `node server.js` console for error messages
2. Verify email is in `ADMIN_EMAIL` in `.env.local`
3. Check spam/junk folder
4. Restart the server after changing `.env.local`

## Testing

1. Keep `node server.js` running
2. Open app at `http://localhost:5176`
3. Click the button and submit a test form
4. Check your email inbox for the submission
5. Reply to the email
6. User receives your reply at their email address

## Security Notes

- Never commit `.env.local` to git (already in .gitignore)
- App Passwords are safe - they only work with Gmail
- Email addresses from submissions are logged but not stored elsewhere
- Submissions stored locally in `data/submissions.json`

## Production Deployment

For production, set environment variables on your hosting platform:
- Heroku: Config Vars
- Vercel: Environment Variables
- AWS: Secrets Manager
- etc.

The server will automatically use those instead of `.env.local`.

## Support

If emails aren't working:
1. Check server console output (errors will be shown)
2. Verify Gmail App Password doesn't have spaces
3. Make sure 2-Step Verification is enabled
4. Try with a different Gmail account if needed
