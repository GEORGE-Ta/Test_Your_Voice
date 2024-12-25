import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import FileUploader from './components/FileUploader';
import SubmitButton from './components/SubmitButton';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';
import { analyzeAudio } from './utils/api';
import { validateAudioFile } from './utils/audioValidation';
import './App.css';

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudioRecorded = (audioBlob: Blob) => {
    const file = new File([audioBlob], 'recorded-audio.wav', { type: 'audio/wav' });
    try {
      validateAudioFile(file);
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
      validateAudioFile(file);
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
      console.error('Error in handleSubmit:', error);
      setError(error instanceof Error ? error.message : '分析失败，请重试');
      setAudioFile(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="app-container">
      <div className="card-container">
        <h1 className="title">测测你的声音</h1>
        <p className="subtitle">听感，音色，反馈</p>
        
        <div className="content-section">
          <AudioRecorder onAudioRecorded={handleAudioRecorded} />
          
          <FileUploader onFileSelected={handleFileSelected} />
          
          <SubmitButton
            onClick={handleSubmit}
            disabled={!audioFile || isAnalyzing}
            isLoading={isAnalyzing}
          />

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded p-4 text-red-300">
              {error}
            </div>
          )}

          {analysisResult && <AnalysisResult
            result={analysisResult}
            isLoading={isAnalyzing}
            error={error}
          />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;