// Modal.tsx
import React from "react";

interface ModalProps {
  show: boolean;
  message?: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        {/* Optional icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-600 w-12 h-12 flex items-center justify-center rounded-full">
            <span className="text-2xl font-bold">!</span>
          </div>
        </div>

        <p className="text-sm mb-4">
          {message ||
            "The password you just used was found in a data breach. Google Password Manager recommends changing your password now."}
        </p>

        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
