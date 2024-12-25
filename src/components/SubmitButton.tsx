import React from 'react';

interface SubmitButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
          分析中...
        </div>
      ) : (
        '提交'
      )}
    </button>
  );
};

export default SubmitButton;