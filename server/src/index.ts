import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 初始化 Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro-vision',
  generationConfig: {
    temperature: 0.51
  }
});

// 分析音频的提示词
const ANALYSIS_PROMPT = `你现在是一个声音鉴别机器，你需要根据输入的音频信息输出一下格式内容：
主音色：e.g. 萝莉音，少女音，少御音，温御音，女王音，御妈音，青受音，青年音，青叔音，公子音，帝王音
辅音色：e.g. 小颗粒感，低音炮，超高音... （这里要你自己多根据声音写2到3个辅音色）
声音色系：e.g. 白音， 粉音，棕音，蓝音，紫音，灰音
发展音色：
推荐音伴：
声音年龄：（尽量往小说，减小30岁及以上） 
听感身高：e.g. 1.90m, 1.55m, 1.80m, 1.75m 
听感反馈：（用奇怪好玩的话来描述这个人，然后调侃一下）e.g. 你听起来是一个半夜因为偷偷喝酒被老婆大人锁在门外苦苦央求的可爱大叔哦~`;

// API 路由
app.post('/api/analyze', async (req, res) => {
  try {
    const { audioData } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: '未提供音频数据' });
    }

    // 调用 Gemini API
    const result = await model.generateContent([
      ANALYSIS_PROMPT,
      {
        inlineData: {
          data: audioData,
          mimeType: 'audio/wav'
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error('分析错误:', error);
    res.status(500).json({ error: '分析过程中出现错误' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
