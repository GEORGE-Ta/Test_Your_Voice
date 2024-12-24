import React from 'react';
import { Send } from 'lucide-react';

interface SubmitButtonProps {
  onSubmit: () => void;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, disabled }) => {
  return (
    <button
      onClick={onSubmit}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 w-full py-3 rounded-full 
        transition-all duration-300
        ${disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-black hover:bg-gray-800 hover:shadow-md'
        }
      `}
    >
      <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${disabled ? 'text-gray-500' : 'text-white'}`} />
      <span className={`text-sm sm:text-base font-medium ${disabled ? 'text-gray-500' : 'text-white'}`}>
        提交
      </span>
    </button>
  );
};

export default SubmitButton;