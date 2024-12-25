import { geminiClient } from './geminiClient';
import { convertAudioToBase64 } from './audioProcessing';
import { validateAudioFile } from './audioValidation';
import { AudioData } from './types';

export async function analyzeAudio(audioFile: File): Promise<string> {
  try {
    // Validate file first
    validateAudioFile(audioFile);
    
    // Convert to base64
    const base64Data = await convertAudioToBase64(audioFile);
    
    // Prepare audio data
    const audioData: AudioData = {
      data: base64Data,
      mimeType: audioFile.type
    };
    
    // Send to API for analysis
    return await geminiClient.analyzeAudio(audioData);
  } catch (error) {
    console.error('Error in analyzeAudio:', error);
    throw error;
  }
}

export { validateAudioFile as isAudioFileValid } from './audioValidation';