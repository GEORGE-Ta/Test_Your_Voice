const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const geminiClient = {
  async analyzeAudio(audioData: { data: string; mimeType: string }): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/analyze-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(audioData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze audio');
    }

    const data = await response.json();
    return data.result;
  }
};
