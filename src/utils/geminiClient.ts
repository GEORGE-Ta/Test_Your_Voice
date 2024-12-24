import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY, MODEL_NAME } from './geminiConfig';
import { AudioData, GeminiError } from './types';

class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  async generateContent(prompt: string, audioData: AudioData): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.51
        }
      });
      const response = await model.generateContent([prompt, { inlineData: audioData }]);
      const result = await response.response;
      
      if (!result.text()) {
        throw new Error('未能获取分析结果');
      }
      
      return result.text();
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private handleApiError(error: any): GeminiError {
    console.error('Gemini API Error:', error);
    return new GeminiError(
      error.message || '未知错误',
      error.code,
      error.details
    );
  }
}

export const geminiClient = new GeminiClient(API_KEY, MODEL_NAME);