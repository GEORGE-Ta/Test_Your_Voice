import { AudioData } from './types';

export async function convertAudioToBase64(file: File): Promise<string> {
  try {
    const buffer = await file.arrayBuffer();
    return btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
  } catch (error) {
    throw new Error('音频文件处理失败，请重试');
  }
}