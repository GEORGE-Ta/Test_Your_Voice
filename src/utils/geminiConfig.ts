import { GoogleGenerativeAI } from '@google/generative-ai';

export const API_KEY = 'AIzaSyBWR53OxlXTRz3VCaqgm8Vydk4d-P09TCE';
export const MODEL_NAME = 'gemini-2.0-flash-exp';

export const genAI = new GoogleGenerativeAI(API_KEY);