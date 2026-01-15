'use client';

import { X } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg w-full h-[95vh] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-wine">
            Tutorial de la Plataforma
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-wine text-3xl font-bold"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-lg">
          Aprende cómo funciona EX LEGE-ON y cómo usar nuestros servicios:
        </p>

        <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 flex-1">
          <iframe
            src="https://www.youtube.com/embed/zV1nzbwEmHQ"
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all mt-4"
        >
          Cerrar Tutorial
        </button>
      </div>
    </div>
  );
}
