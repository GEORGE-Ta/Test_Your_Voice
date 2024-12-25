const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function analyzeAudio(audioFile: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    // 设置请求选项，不设置 Content-Type，让浏览器自动设置
    const response = await fetch(`${API_BASE_URL}/analyze-audio`, {
      method: 'POST',
      body: formData,
      // 重要：不要手动设置 Content-Type，让浏览器处理
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network response was not ok' }));
      throw new Error(error.message || 'Failed to analyze audio');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error analyzing audio:', error);
    throw error;
  }
}
