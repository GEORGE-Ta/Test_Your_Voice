import { useState } from 'react';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="fixed bottom-2 right-4 flex gap-4 text-sm text-gray-400">
      <a
        href="https://space.bilibili.com/3546791920273483?spm_id_from=333.1007.0.0"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-600 transition-colors"
      >
        Bilibili
      </a>
      
      <a
        href="https://github.com/GEORGE-Ta"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-600 transition-colors"
      >
        GitHub
      </a>

      <button
        onClick={() => setShowModal(true)}
        className="hover:text-gray-600 transition-colors"
      >
        ”玩的挺开心，本大爷给你赏点💰“
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4 relative animate-scaleIn shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">感谢支持！</h3>
            <p className="text-gray-600 mb-6 text-center">
              有您能体验这个应用还提供这么大的帮助，真是感激不尽！以后有新内容会提前告知您的！
            </p>
            <div className="flex justify-center">
              <img src="/qrcode.jpg" alt="收款码" className="max-w-[200px] h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
