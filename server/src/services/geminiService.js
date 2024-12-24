const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = 'gemini-2.0-flash-exp';

async function analyzeAudio(audioData) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.51
      }
    });

    const prompt = `你现在是一个声音鉴别机器，你需要根据输入的音频信息输出一下格式内容：（要在每个输出后面加上括号简单解释一下什么意思）
    1. 音色评分（满分10分）：
    2. 音色特点：
    3. 音色类型：
    4. 声音特征：
    5. 建议：`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: audioData.mimeType,
          data: audioData.data
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze audio');
  }
}

module.exports = {
  analyzeAudio
};
