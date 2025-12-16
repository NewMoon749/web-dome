'use client';

import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappNumber = '+1234567890';
  const whatsappMessage = encodeURIComponent('Hola, me gustaría obtener más información sobre EX LEGE-ON');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="bg-wine-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y Eslogan */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">EX LEGE-ON</h2>
            <p className="text-white/80 mb-4">
              Tu Consulta Legal Inmediata al alcance de un click
            </p>
            <p className="text-white/70 text-sm">
              Conectamos a personas con abogados especializados de manera rápida y accesible.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('nosotros')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contáctanos
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href="mailto:contacto@exlegeon.com"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  contacto@exlegeon.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a
                  href="tel:+1234567890"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={18} />
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} EX LEGE-ON. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

