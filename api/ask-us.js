import fs from 'fs';
import path from 'path';

const submissionsFile = path.join(process.cwd(), 'data', 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, category, priority, subject, message } = req.body;

      // Validation
      if (!name || !email || !category || !priority || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Load existing submissions
      let submissions = [];
      if (fs.existsSync(submissionsFile)) {
        try {
          const data = fs.readFileSync(submissionsFile, 'utf-8');
          submissions = JSON.parse(data);
        } catch (e) {
          submissions = [];
        }
      }

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
        status: 'new'
      };

      submissions.push(newSubmission);

      // Save to file
      fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

      // Log to console
      console.log(`[Ask Us] New submission from ${name} (${email}):`, newSubmission);

      return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! We will get back to you soon.',
        submissionId: newSubmission.id
      });
    } catch (error) {
      console.error('Error processing submission:', error);
      return res.status(500).json({ error: 'Failed to process submission' });
    }
  }

  if (req.method === 'GET') {
    try {
      // Get all submissions (admin only in production)
      if (!fs.existsSync(submissionsFile)) {
        return res.status(200).json({ submissions: [] });
      }

      const data = fs.readFileSync(submissionsFile, 'utf-8');
      const submissions = JSON.parse(data);

      return res.status(200).json({ submissions });
    } catch (error) {
      console.error('Error retrieving submissions:', error);
      return res.status(500).json({ error: 'Failed to retrieve submissions' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
