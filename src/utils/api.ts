import { AudioData } from './types';

const API_BASE_URL = 'http://localhost:3001/api';

export async function analyzeAudio(audioFile: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch(`${API_BASE_URL}/analyze-audio`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze audio');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw error;
  }
}
