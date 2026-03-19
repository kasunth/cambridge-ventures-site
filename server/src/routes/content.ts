import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const dataDir = path.resolve(__dirname, '../../../data');

const validPages = ['home', 'venture', 'realestate', 'careers', 'contact', 'team', 'projects'];

router.get('/:page', (req: Request, res: Response): void => {
  const page = req.params.page as string;
  if (!validPages.includes(page)) {
    res.status(404).json({ error: 'Page not found' });
    return;
  }

  const filePath = path.join(dataDir, `${page}.json`);
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

router.put('/:page', authMiddleware, (req: Request, res: Response): void => {
  const page = req.params.page as string;
  if (!validPages.includes(page)) {
    res.status(404).json({ error: 'Page not found' });
    return;
  }

  const filePath = path.join(dataDir, `${page}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to write content' });
  }
});

export default router;
