'use client';

import { Mail, Phone, MessageCircle, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email
    const mailtoLink = `mailto:contacto@exlegeon.com?subject=Consulta desde EX LEGE-ON&body=Nombre: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMensaje: ${formData.message}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const whatsappNumber = '+1234567890'; // Reemplazar con número real
  const whatsappMessage = encodeURIComponent('Hola, me gustaría obtener más información sobre EX LEGE-ON');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-wine text-center mb-4">
          Contáctanos
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Estamos aquí para ayudarte. Elige la forma que prefieras para contactarnos.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-wine mb-6 flex items-center gap-2">
              <Mail className="text-wine" size={28} />
              Envíanos un Mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <div className="bg-green-500 p-3 rounded-full">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-wine text-lg">WhatsApp</h4>
                  <p className="text-gray-600">Chatea con nosotros ahora</p>
                  <p className="text-sm text-green-600 font-semibold mt-1">Disponible 24/7</p>
                </div>
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-wine">
              <div className="flex items-center gap-4">
                <div className="bg-wine p-3 rounded-full">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-wine text-lg">Correo Electrónico</h4>
                  <a href="mailto:contacto@exlegeon.com" className="text-gray-600 hover:text-wine transition-colors">
                    contacto@exlegeon.com
                  </a>
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-wine">
              <div className="flex items-center gap-4">
                <div className="bg-wine p-3 rounded-full">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-wine text-lg">Teléfono</h4>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-wine transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-wine text-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <Clock size={24} className="mt-1" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Horarios de Atención</h4>
                  <div className="space-y-2">
                    <p className="text-white/90">
                      <span className="font-semibold">Atención General:</span><br />
                      Lunes a Sábados: 8 AM - 11 PM
                    </p>
                    <p className="text-white/90 mt-3">
                      <span className="font-semibold">Chat y WhatsApp:</span><br />
                      Disponible 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

