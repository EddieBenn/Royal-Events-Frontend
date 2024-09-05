// Modal.tsx
import React from 'react';
import Button from '../components/Button';

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  buttons?: {
    label: string;
    onClick: () => void;
    bg: string;
    text: string;
  }[];
}

export const Modal: React.FC<ModalProps> = ({ onClose, children, buttons }) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[50%] p-8 rounded-lg items-center justify-center border-solid border-2 flex flex-col border-green-800">
        {children}
        <div className='flex justify-around w-[90%]'>
        {buttons &&
          buttons.map((button, index) => (
            <Button
              key={index}
              title={button.label}
              bg={button.bg}
              text={button.text}
              onClick={button.onClick}
            />
          ))}
        <Button title="Close" bg="#27AE60" text="white" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
