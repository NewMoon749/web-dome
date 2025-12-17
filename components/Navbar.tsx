'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 transform"
            onClick={() => scrollToSection('home')}
          >
            {!logoError ? (
              <div className="relative w-[50px] h-[50px] transition-transform duration-300 hover:rotate-6">
                <Image
                  src="/logo.png"
                  alt="EX LEGE-ON Logo"
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                  unoptimized
                />
              </div>
            ) : null}
            <span className="text-2xl font-bold text-wine">EX LEGE-ON</span>
          </div>

          <div className="hidden md:flex items-center flex-1 justify-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-wine hover:text-wine-dark transition-all duration-300 font-medium relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="text-wine hover:text-wine-dark transition-all duration-300 font-medium relative group"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-wine hover:text-wine-dark transition-all duration-300 font-medium relative group"
            >
              Servicios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-wine hover:text-wine-dark transition-all duration-300 font-medium relative group"
            >
              Contáctanos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => scrollToSection('consultas-express')}
              className="bg-wine text-white px-6 py-2 rounded-lg font-semibold hover:bg-wine-dark transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform"
            >
              Agendar Consulta
            </button>
          </div>

          <button
            className="md:hidden text-wine transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-wine hover:text-wine-dark transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="block w-full text-left text-wine hover:text-wine-dark transition-colors font-medium"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="block w-full text-left text-wine hover:text-wine-dark transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left text-wine hover:text-wine-dark transition-colors font-medium"
            >
              Contáctanos
            </button>
            <button
              onClick={() => scrollToSection('consultas-express')}
              className="block w-full bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all text-center mt-4"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

