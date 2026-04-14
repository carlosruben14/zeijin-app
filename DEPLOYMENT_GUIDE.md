# Deployment Guide: zeijintopup.com

## 🎯 Complete Setup Plan

Your app will be live at: **zeijintopup.com**

---

## STEP 1: Buy Domain (5 minutes) 💳

### Option A: Namecheap (Cheapest ~$8.88/year)
1. Go to **namecheap.com**
2. Search: `zeijintopup.com`
3. Add to cart
4. Checkout (use code BESTNAMECHEAP for discount)
5. **Save your admin password** for later

### Option B: GoDaddy (~$14.99/year)
1. Go to **godaddy.com**
2. Search: `zeijintopup.com`
3. Add & checkout

---

## STEP 2: Prepare Your Git Repository (5 minutes) 📦

Make sure your code is on GitHub:

1. If not already done:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zeijin-app.git
git push -u origin main
```

2. **Replace YOUR_USERNAME** with your GitHub username

---

## STEP 3: Deploy Frontend to Vercel (10 minutes) 🌐

### 3.1 Sign Up to Vercel
1. Go to **vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 3.2 Import Your Project
1. Click **"+ New Project"**
2. Search for your repo: `zeijin-app`
3. Click **Import**
4. Click **Deploy** (use default settings)

**Vercel will deploy in 2-3 minutes**

You'll get a temporary URL: `zeijin-app.vercel.app`

### 3.3 Connect Your Domain
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Click **"Add Custom Domain"**
4. Type: `zeijintopup.com`
5. Click **Add**

Vercel shows you **4 nameservers** like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

**Copy all 4 nameservers**

---

## STEP 4: Point Domain to Vercel (5 minutes) 🔗

### If you bought from Namecheap:

1. Go to **namecheap.com**
2. Login → **Domain List**
3. Click your domain `zeijintopup.com`
4. Click **Manage**
5. Go to **Nameservers** tab
6. Select **Custom Nameservers**
7. Paste the 4 Vercel nameservers (one per box)
8. Click **Save**

### If you bought from GoDaddy:

1. Go to **godaddy.com**
2. Click **My Products** → Your domain
3. Click **Manage** → **Nameservers**
4. Click **Change Nameservers**
5. Select **"I'll use my own nameservers"**
6. Paste the 4 Vercel nameservers
7. Click **Save**

**⏳ Wait 24-48 hours for DNS to update**

Once updated: Visit **zeijintopup.com** ✅

---

## STEP 5: Deploy Backend to Railway (10 minutes) 🚀

Your backend (`node server.js`) needs to run somewhere.

### 5.1 Sign Up to Railway
1. Go to **railway.app**
2. Click **Sign Up**
3. Continue with GitHub

### 5.2 Deploy Backend
1. Click **"New Project"**
2. Select **"Deploy from GitHub"**
3. Choose your `zeijin-app` repo
4. Click **"Add Service"** → **"GitHub Repo"**
5. Select your repo again
6. Click **Deploy**

### 5.3 Configure Environment Variables

In Railway dashboard:

1. Go to your project
2. Click the **service** that was created
3. Click **Variables**
4. Add these variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = ceapanganiban@gmail.com
SMTP_PASSWORD = akxhbyzakcavfwpp
ADMIN_EMAIL = ceapanganiban@gmail.com
NODE_ENV = production
```

5. Click **Deploy**

### 5.4 Get Your Backend URL

In Railway:
1. Click your service
2. Look for **"Public URL"** (Railway generates this)
3. Copy it (looks like: `https://your-railway-app.up.railway.app`)

---

## STEP 6: Update Frontend to Use Backend (5 minutes) ⚙️

Update your `vite.config.js` to point to Railway:

```javascript
server: {
  proxy: {
    '/api/ask-us': {
      target: 'https://your-railway-app.up.railway.app',
      changeOrigin: true
    },
    // ... other proxies
  }
}
```

**Replace** `https://your-railway-app.up.railway.app` with your actual Railway URL

Then push to GitHub:
```bash
git add vite.config.js
git commit -m "Update backend URL"
git push
```

Vercel automatically redeploys when you push! ✅

---

## STEP 7: Verify Everything Works (5 minutes) ✅

### Test Frontend:
1. Go to **zeijintopup.com**
2. Should see your Zeijin app
3. Click Games tab, see all games
4. Try the Wiki search

### Test Ask Us Feature:
1. Click **💬 button** (bottom-left)
2. Fill out form
3. Submit
4. Check **ceapanganiban@gmail.com** for email ✉️
5. Try replying to the email

### Check Submissions:
- Local: `data/submissions.json` on your computer
- Remote: Railway backend has a copy

---

## 🎉 Final Summary

| Component | URL | Status |
|-----------|-----|--------|
| **Website** | zeijintopup.com | ✅ Live |
| **Backend** | railway-url/api | ✅ Running |
| **Email** | ceapanganiban@gmail.com | ✅ Receiving |
| **Data** | submissions.json | ✅ Stored |

---

## 💰 Monthly Costs

- Domain: ~$0.74/month
- Vercel: FREE (generous free tier)
- Railway: FREE for first $5/month credit (we use ~$2/month)
- **Total: ~$1-2/month** 🎯

---

## 🆘 Troubleshooting

### "Domain still shows default Vercel page"
- **Wait 24-48 hours** for DNS to propagate
- Check: `dig zeijintopup.com` in terminal

### "Backend not connecting"
- Verify Railway public URL is correct
- Check Railway environment variables are set
- Restart the Railway service

### "Emails not sending"
- Verify Gmail app password is correct (no spaces!)
- Check Railway shows no errors in logs
- Verify `SMTP_USER` and `ADMIN_EMAIL` are set

### "502 Bad Gateway on zeijintopup.com"
- Vercel deployment might be in progress
- Wait 2-3 minutes and refresh
- Check Vercel deployment status

---

## 📋 Checklist

- [ ] Buy domain: zeijintopup.com
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Add domain in Vercel settings
- [ ] Update nameservers (Namecheap/GoDaddy)
- [ ] Deploy backend to Railway
- [ ] Set Railway environment variables
- [ ] Update vite.config.js with Railway URL
- [ ] Push updated code to GitHub
- [ ] Test at zeijintopup.com
- [ ] Test Ask Us form
- [ ] Check email receives submissions

**Estimated Total Time: 1-2 hours** ⏱️

---

## 🚀 Next Steps

1. **Start with Step 1** - Buy the domain
2. **DM me** when domain is purchased
3. I'll guide you through remaining steps
4. Your site will be live within a few hours!

Good luck! 🎉
