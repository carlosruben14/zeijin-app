import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load .env.local only in development (local dev)
// On Railway, environment variables are injected directly
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.local' });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Log environment variables for debugging
console.log('\n🔧 Environment Configuration:');
console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}\n`);

// Configure email transporter
let transporter = null;
const emailConfigured = process.env.SMTP_USER && process.env.SMTP_PASSWORD;

if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // Use TLS (not SSL) for port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Verify transporter connection
  transporter.verify((error, success) => {
    if (error) {
      console.log('⚠️  Email service not available:', error.message);
      transporter = null;
    } else {
      console.log('✅ Email service connected successfully');
    }
  });
} else {
  console.log('⚠️  Email credentials not configured in .env.local');
}

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Serve static frontend files from dist folder (production)
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  console.log('📁 Serving static files from:', distDir);
}

// Data directory
const dataDir = path.join(__dirname, 'data');
const submissionsFile = path.join(dataDir, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize submissions.json if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
}

// POST: Create new submission
app.post('/api/ask-us', async (req, res) => {
  try {
    const { name, email, category, priority, subject, message } = req.body;

    // Validation
    if (!name || !email || !category || !priority || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Load existing submissions
    const data = fs.readFileSync(submissionsFile, 'utf-8');
    let submissions = JSON.parse(data);

    // Create new submission
    const newSubmission = {
      id: Date.now().toString(),
      name,
      email,
      category,
      priority,
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'new',
      read: false
    };

    submissions.push(newSubmission);

    // Save to file
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

    // Log to console
    console.log(`\n📬 [Ask Us] New submission from ${name} (${email})`);
    console.log(`Category: ${category} | Priority: ${priority}`);
    console.log(`Subject: ${subject}\n`);

    // Send email if configured
    if (transporter) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
        const categoryLabel = {
          bug_report: '🐛 Bug Report',
          feature_request: '💡 Feature Request',
          question: '❓ Question',
          game_request: '🎮 Game Request',
          other: 'Other'
        }[category] || category;

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: adminEmail,
          replyTo: email,
          subject: `[${priority.toUpperCase()}] ${subject} - ${categoryLabel}`,
          html: `
            <h2>New ${categoryLabel} from Zeijin Ask Us</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Category:</strong> ${categoryLabel}</p>
            <p><strong>Priority:</strong> <span style="color: ${priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}">${priority.toUpperCase()}</span></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              Submitted: ${new Date(newSubmission.timestamp).toLocaleString()}<br>
              Submission ID: ${newSubmission.id}
            </p>
            <p style="color: #999; font-size: 11px;">
              <strong>Reply directly to this email</strong> to respond to the user.
            </p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`✉️  Email sent to ${adminEmail}`);
      } catch (emailError) {
        console.log(`⚠️  Failed to send email: ${emailError.message}`);
        // Don't fail the submission if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
      submissionId: newSubmission.id
    });
  } catch (error) {
    console.error('❌ Error processing submission:', error);
    return res.status(500).json({ error: 'Failed to process submission' });
  }
});

// GET: Retrieve all submissions
app.get('/api/ask-us', (req, res) => {
  try {
    const data = fs.readFileSync(submissionsFile, 'utf-8');
    const submissions = JSON.parse(data);
    return res.status(200).json({ submissions, total: submissions.length });
  } catch (error) {
    console.error('❌ Error retrieving submissions:', error);
    return res.status(500).json({ error: 'Failed to retrieve submissions' });
  }
});

// GET: Retrieve single submission by ID
app.get('/api/ask-us/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(submissionsFile, 'utf-8');
    const submissions = JSON.parse(data);
    const submission = submissions.find(s => s.id === id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    return res.status(200).json({ submission });
  } catch (error) {
    console.error('❌ Error retrieving submission:', error);
    return res.status(500).json({ error: 'Failed to retrieve submission' });
  }
});

// Catch-all route: serve index.html for all non-API routes (SPA routing)
app.get('*', (req, res) => {
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Ask Us Backend Server running on http://localhost:${PORT}`);
  console.log(`📝 Submissions stored in: ${submissionsFile}\n`);
});
