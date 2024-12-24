import React from 'react';

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
        <p className="text-center text-gray-600 mt-2">正在分析音频...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 rounded-xl">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
      <h2 className="text-lg font-semibold mb-3">分析结果</h2>
      <div className="whitespace-pre-wrap text-gray-700">{result}</div>
    </div>
  );
};

export default AnalysisResult;