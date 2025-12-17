'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openChatbot = () => {
    // Dispara un evento personalizado para abrir el chatbot
    window.dispatchEvent(new CustomEvent('openChatbot'));
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      {/* Imagen de fondo con blur */}
      {!imageError && (
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Fondo legal"
            fill
            className="object-cover blur-sm"
            priority
            quality={75}
            onError={() => setImageError(true)}
          />
          {/* Overlay oscuro para mantener legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-wine/80 via-wine-light/80 to-wine-dark/80"></div>
        </div>
      )}
      {/* Fallback si no hay imagen */}
      {imageError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-wine via-wine-light to-wine-dark"></div>
      )}

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          EX LEGE-ON
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light">
          Tu Consulta Legal Inmediata al alcance de un click
        </p>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Conectamos a personas con abogados especializados de manera rápida y accesible. Consultas legales a tu alcance, con profesionales certificados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('servicios')}
            className="bg-white text-wine px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Ver Servicios
          </button>
          <button
            onClick={openChatbot}
            className="bg-wine-light text-white px-8 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Iniciar Chat
          </button>
        </div>
      </div>
    </section>
  );
}

