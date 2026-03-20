import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database setup
const db = new sqlite3.Database('./gallery.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS user_uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      originalname TEXT,
      title TEXT,
      description TEXT,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      votes INTEGER DEFAULT 0
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS user_preferences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artwork_id TEXT,
      rating INTEGER,
      user_id TEXT
    )`);
  }
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// API Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { title, description, username } = req.body;
  const filename = req.file.filename;
  const originalname = req.file.originalname;

  console.log(`Uploading: ${title} by ${username} (${filename})`);
  
  db.run(`INSERT INTO user_uploads (filename, originalname, title, description, username) VALUES (?, ?, ?, ?, ?)`,
    [filename, originalname, title, description, username || 'Anonymous'], function(err) {
      if (err) {
        console.error('Error inserting upload:', err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
      console.log(`Upload successful with id: ${this.lastID}`);
      res.json({ id: this.lastID, filename, message: 'Upload successful' });
    });
});

app.get('/api/uploads', (req, res) => {
  db.all(`SELECT * FROM user_uploads ORDER BY votes DESC, uploaded_at DESC`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching uploads:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log(`Fetched ${rows.length} uploads`);
    res.json(rows);
  });
});

app.post('/api/preference', (req, res) => {
  const { artworkId, rating, userId } = req.body;
  db.run(`INSERT OR REPLACE INTO user_preferences (artwork_id, rating, user_id) VALUES (?, ?, ?)`,
    [artworkId, rating, userId || 'anonymous'], function(err) {
      if (err) {
        console.error('Error saving preference:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Preference saved' });
    });
});

app.get('/api/preferences/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM user_preferences WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching preferences:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Simple ranking based on preferences (mock implementation)
app.get('/api/rank/:userId', (req, res) => {
  const { userId } = req.params;
  // This is a simplified ranking - in reality, you'd need image analysis or ML
  // For now, just return uploads sorted by votes
  db.all(`SELECT * FROM user_uploads ORDER BY votes DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/vote/:id', (req, res) => {
  const { id } = req.params;
  db.run(`UPDATE user_uploads SET votes = votes + 1 WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Vote recorded' });
  });
});

app.delete('/api/uploads/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Attempting to delete upload with id: ${id}`);
  
  db.run(`DELETE FROM user_uploads WHERE id = ?`, [parseInt(id)], function(err) {
    if (err) {
      console.error('Error deleting upload:', err);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    
    if (this.changes === 0) {
      console.warn(`No rows deleted for id: ${id}`);
      return res.status(404).json({ error: 'Upload not found' });
    }
    
    console.log(`Successfully deleted upload with id: ${id}`);
    res.json({ message: 'Upload deleted', deletedRows: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});