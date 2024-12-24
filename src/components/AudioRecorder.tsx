import React, { useState, useRef } from 'react';
import { Mic, Circle } from 'lucide-react';

interface AudioRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        onAudioRecorded(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`
        flex items-center justify-center gap-2 w-full py-3 rounded-full transition-all duration-300
        ${isRecording 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-300/50' 
          : 'bg-red-400 hover:bg-red-500'
        }
      `}
    >
      {isRecording ? (
        <>
          <Circle className="w-5 h-5 text-white animate-pulse" />
          <span className="text-white font-medium animate-pulse">停止录音</span>
        </>
      ) : (
        <>
          <Mic className="w-5 h-5 text-white" />
          <span className="text-white font-medium">录音</span>
        </>
      )}
    </button>
  );
};

export default AudioRecorder;