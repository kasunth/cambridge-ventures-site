import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/', (req: Request, res: Response): void => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  // Log to a file (in production, send email via nodemailer)
  const logDir = path.resolve(__dirname, '../../../data');
  const logFile = path.join(logDir, 'contact-submissions.json');

  let submissions: unknown[] = [];
  try {
    if (fs.existsSync(logFile)) {
      submissions = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
    }
  } catch {
    submissions = [];
  }

  submissions.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(logFile, JSON.stringify(submissions, null, 2), 'utf-8');
  res.json({ success: true, message: 'Message sent successfully' });
});

export default router;
