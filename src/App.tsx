import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import FileUploader from './components/FileUploader';
import SubmitButton from './components/SubmitButton';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';
import { analyzeAudio, isAudioFileValid } from './utils/gemini';

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudioRecorded = (audioBlob: Blob) => {
    const file = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
    try {
      isAudioFileValid(file);
      setAudioFile(file);
      setAnalysisResult(null);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '音频文件无效');
      setAudioFile(null);
    }
  };

  const handleFileSelected = (file: File) => {
    try {
      isAudioFileValid(file);
      setAudioFile(file);
      setAnalysisResult(null);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : '音频文件无效');
      setAudioFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!audioFile) return;

    try {
      setIsAnalyzing(true);
      setError(null);
      const result = await analyzeAudio(audioFile);
      setAnalysisResult(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : '分析失败，请重试');
      setAudioFile(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">测测你的声音</h1>
          <p className="text-gray-600 text-sm sm:text-base">听感，音色，反馈</p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-4">
          <AudioRecorder onAudioRecorded={handleAudioRecorded} />
          <FileUploader onFileSelected={handleFileSelected} />
          <SubmitButton onSubmit={handleSubmit} disabled={!audioFile || isAnalyzing} />
        </div>

        <AnalysisResult 
          result={analysisResult}
          isLoading={isAnalyzing}
          error={error}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;