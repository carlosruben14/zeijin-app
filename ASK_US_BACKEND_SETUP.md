# Ask Us Feature - Backend Integration Guide

## Overview
The "Ask Us" feature allows players to submit requests, bug reports, feature requests, and questions with priority levels.

## Backend Already Implemented!

A simple Node.js server has been created to handle and store all submissions.

### Files Added:
- `server.js` - Express backend server that stores submissions
- `/data/submissions.json` - JSON file that stores all submissions
- `vite.config.js` - Updated with API proxy for development

## Running the Backend

### In Development:

**Terminal 1 - Start the backend server:**
```bash
node server.js
```
You should see:
```
Ask Us Backend Server running on http://localhost:3001
Submissions stored in: ./data/submissions.json
```

**Terminal 2 - Start the dev server:**
```bash
npm run dev
```

### How It Works:

1. Users fill out the Ask Us form
2. Form submission POSTs to `http://localhost:3001/api/ask-us`
3. Backend validates and stores in `data/submissions.json`
4. User sees success confirmation
5. Each submission gets:
   - Unique ID (timestamp)
   - Timestamp of submission
   - All form data (name, email, category, priority, subject, message)
   - Status (default: 'new')
   - Read flag (default: false)

## Viewing Submissions

### Method 1: View JSON File
Open `data/submissions.json` to see all submissions in JSON format

### Method 2: API Endpoint
While both servers are running:
- **All submissions:** `http://localhost:3001/api/ask-us`
- **Single submission:** `http://localhost:3001/api/ask-us/[SUBMISSION_ID]`

Visit these in your browser or use curl:
```bash
curl http://localhost:3001/api/ask-us
```

### Example Submission Format:
```json
{
  "id": "1712234567890",
  "name": "Carlos Ruben",
  "email": "carlos@example.com",
  "category": "bug_report",
  "priority": "high",
  "subject": "Modal not centering",
  "message": "The pricing modal is appearing off-center on mobile devices...",
  "timestamp": "2026-04-14T10:30:45.890Z",
  "status": "new",
  "read": false
}
```

## Production Deployment

### Option 1: Separate Backend + Frontend (Recommended)

Deploy backend and frontend separately:

**Backend:** Use any Node.js hosting:
- Heroku, Railway, Render, Fly.io, AWS Lambda, etc.
- Environment: `NODE_ENV=production`
- Port: Configurable via environment variable

**Frontend:** Use any static hosting:
- Vercel, Netlify, AWS S3 + CloudFront, etc.
- Update `vite.config.js` proxy to point to production backend URL

### Option 2: Same Server

Deploy backend + frontend on same VPS:
- Backend listens on port 3001 (or higher)
- Frontend served by Node.js static middleware
- Use reverse proxy (Nginx) to route:
  - `/api/*` → Backend (port 3001)
  - `/*` → Frontend (dist folder)

### Option 3: Serverless

Modify handler for serverless (Lambda, Vercel Functions, Netlify Functions):

```typescript
// Works with Vercel Functions
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    // Save to database instead of file
    // (Vercel Functions can't write to filesystem)
    const submission = req.body;
    // Save to Supabase, MongoDB, etc.
    return res.status(200).json({ success: true });
  }
}
```

## Adding Email Notifications

To send emails when submissions arrive, add nodemailer:

```bash
npm install nodemailer
```

Update `server.js`:
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// In POST handler, after saving:
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'support@zeijin.com',
  subject: `[${priority.toUpperCase()}] ${subject}`,
  html: `<h2>${name} submitted: ${subject}</h2><p>${message}</p>`,
  replyTo: email
});
```

## Database Integration

To use a proper database instead of JSON file:

### MongoDB Example:
```javascript
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  priority: String,
  subject: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'new' },
  read: { type: Boolean, default: false }
});

const Submission = mongoose.model('Submission', submissionSchema);

// In POST handler:
const submission = new Submission(req.body);
await submission.save();
```

### Environment Variables (.env):
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/zeijin
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
PORT=3001
```

## Monitoring Submissions

Add a simple admin dashboard at `/admin/submissions`:

```typescript
// Create admin page to view all submissions
// Route: http://localhost:5176/admin/submissions
// Shows table of all submissions with filters by category/priority
```

## Form Data Categories

| Category | Use Case |
|----------|----------|
| `bug_report` | Report app or website bugs |
| `feature_request` | Request new features |
| `question` | General questions |
| `game_request` | Request new games to be added |
| `other` | Other inquiries |

## Production Checklist

- [ ] Set up database (MongoDB, PostgreSQL, etc.)
- [ ] Configure email notifications
- [ ] Set up admin dashboard
- [ ] Add authentication to view submissions
- [ ] Set up rate limiting (prevent spam)
- [ ] Add spam detection/filtering
- [ ] Configure CORS properly
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Add backup/restore functionality
- [ ] Monitor submission volume
- [ ] Set up auto-responder emails
- [ ] Test with real data

## Troubleshooting

**Problem:** "Cannot POST /api/ask-us"
- Solution: Make sure `server.js` is running on port 3001

**Problem:** "Submissions not saving"
- Solution: Check if `data/` directory has write permissions

**Problem:** "CORS errors"
- Solution: Server has CORS middleware enabled by default. Check browser console.

**Problem:** "Old submissions keep disappearing"
- Solution: The in-memory data is lost on server restart. Use a database for persistence.

