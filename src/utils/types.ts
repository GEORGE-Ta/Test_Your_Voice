export interface AudioData {
  data: string;
  mimeType: string;
}

export class GeminiError extends Error {
  code?: string;
  details?: string;

  constructor(message: string, code?: string, details?: string) {
    super(message);
    this.name = 'GeminiError';
    this.code = code;
    this.details = details;
  }
}