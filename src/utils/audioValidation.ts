const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_AUDIO_TYPES = [
  'audio/wav',
  'audio/mpeg',
  'audio/mp3',
  'audio/mp4',
  'audio/webm',
  'audio/ogg'
];

export function validateAudioFile(file: File): void {
  if (!file) {
    throw new Error('请选择音频文件');
  }

  if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
    throw new Error('不支持的音频格式。请上传 WAV, MP3, MP4, WebM 或 OGG 格式的文件。');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('文件大小不能超过 10MB');
  }
}