const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const SUPPORTED_TYPES = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg'];

export function validateAudioFile(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('音频文件不能超过20MB');
  }

  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new Error('仅支持WAV、MP3和OGG格式的音频文件');
  }
}