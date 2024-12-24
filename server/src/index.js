require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { analyzeAudio } = require('./services/geminiService');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/analyze-audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const audioData = {
      data: req.file.buffer.toString('base64'),
      mimeType: req.file.mimetype
    };

    const result = await analyzeAudio(audioData);
    res.json({ result });
  } catch (error) {
    console.error('Error analyzing audio:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
