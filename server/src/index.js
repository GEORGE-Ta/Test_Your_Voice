require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { analyzeAudio } = require('./services/geminiService');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// CORS configuration
const corsOptions = {
  origin: [
    'https://shengyin.us.kg',                    // 你的主域名
    'https://test-your-voice.vercel.app',        // Vercel 部署的域名（需要替换成你的）
    'http://localhost:5173',                     // Vite 开发服务器
    'http://localhost:3000'                      // 备用开发端口
  ],
  methods: ['GET', 'POST', 'OPTIONS'],           // 允许的 HTTP 方法
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  credentials: true,                             // 允许携带凭证
  maxAge: 86400                                 // CORS 预检请求缓存时间（24小时）
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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
