import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const uploadsDir = path.resolve(__dirname, '../../../client/public/uploads');

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const category = (req.body?.category as string) || 'general';
    const dir = path.join(uploadsDir, category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

router.post('/', authMiddleware, upload.single('image'), (req: AuthRequest, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  const category = req.body?.category || 'general';
  const filePath = `/uploads/${category}/${req.file.filename}`;
  res.json({ path: filePath });
});

router.delete('/', authMiddleware, (req: AuthRequest, res: Response): void => {
  const { filePath } = req.body;
  if (!filePath) {
    res.status(400).json({ error: 'No file path provided' });
    return;
  }

  const fullPath = path.join(path.resolve(__dirname, '../../../client/public'), filePath);
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default router;
