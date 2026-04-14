# Finding Gmail App Password - Visual Guide

## You're Already Set Up! ✅

Your Google Account shows:
- ✅ 2-Step Verification: **ON** (since 10:33 AM)
- ✅ Password: Set
- ✅ Ready for App Passwords!

## Next Step: Get App Password

### On the SAME page you're viewing:

**Scroll DOWN** to find a section labeled:
- **"App passwords"** 
- Usually appears below "Recovery email"

OR look in left sidebar under:
- **"Security & sign-in"** → Scroll to **"App passwords"**

## What to Do:

1. Click on **"App passwords"**
   
2. A dropdown menu appears with 2 selections:
   - Select Application: **Mail** ✓
   - Select Device: **Windows Computer** ✓
   
3. Click **Generate**

4. Google shows a **16-character gray box** with your password:
   ```
   abcd efgh ijkl mnop
   ```

5. **Copy all 16 characters** (Google automatically copies them)

## Update .env.local:

In your project, open `.env.local` and paste:

```env
SMTP_USER=beapanganiban2@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=beapanganiban2@gmail.com
```

Replace `abcdefghijklmnop` with your 16 characters.

## Restart Server:

```bash
node server.js
```

Done! ✅

## Can't Find App Passwords?

**If you don't see "App passwords" option:**

1. Make sure 2-Step Verification is **ON** (you have it ✅)
2. **Scroll down more** on the Security & sign-in page
3. Refresh the page (F5)
4. Try different browser
5. Check if you're looking at: **myaccount.google.com/security** ✓

It should be there! Usually it's the 4th or 5th section down.
