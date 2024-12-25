import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import FileUploader from './components/FileUploader';
import SubmitButton from './components/SubmitButton';
import AnalysisResult from './components/AnalysisResult';
import { analyzeAudio } from './utils/api';
import { validateAudioFile } from './utils/audioValidation';
import './App.css';

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleFileSelected = (file: File) => {
    try {
      validateAudioFile(file);
      setAudioFile(file);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleAudioRecorded = (audioBlob: Blob) => {
    const file = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
    setAudioFile(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!audioFile) {
      setError('请先选择或录制音频文件');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await analyzeAudio(audioFile);
      setAnalysisResult(response.result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">测测你的声音</h1>
            <p className="text-lg text-gray-600 mb-8">听感，音色，反馈</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">点击按钮录音</p>
                <AudioRecorder onAudioRecorded={handleAudioRecorded} />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">从本地文件选择</p>
                <FileUploader onFileSelected={handleFileSelected} />
              </div>

              <SubmitButton
                onClick={handleSubmit}
                disabled={!audioFile || isLoading}
                isLoading={isLoading}
              />

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              {analysisResult && (
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">
                    使用的 AI 模型: Gemini
                  </div>
                  <AnalysisResult 
                    result={analysisResult} 
                    isLoading={isLoading}
                    error={error}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;