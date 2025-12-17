'use client';

import { Briefcase, Users, Copyright, Info, DollarSign } from 'lucide-react';
import { useState } from 'react';
import VideoCallModal from './VideoCallModal';

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  priceRange: string;
  details: string;
  color: string;
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedServiceArea, setSelectedServiceArea] = useState('');

  const services: Service[] = [
    {
      id: 'laboral',
      name: 'Laboral',
      icon: <Briefcase size={48} />,
      description: 'Asesoría en derecho laboral, contratos, despidos y más',
      priceRange: '$150 - $400',
      details: 'Nuestro servicio de patrocinio legal en materia laboral incluye: revisión de contratos laborales, asesoría en despidos injustificados, negociación de condiciones laborales, defensa en juicios laborales, cálculo de prestaciones y liquidaciones, y asesoría en relaciones laborales complejas. Nuestros abogados especializados te acompañarán en cada paso del proceso.',
      color: 'blue',
    },
    {
      id: 'familiar',
      name: 'Familiar',
      icon: <Users size={48} />,
      description: 'Derecho familiar, divorcios, custodia, herencias',
      priceRange: '$200 - $500',
      details: 'El área de derecho familiar abarca: procesos de divorcio (convencional y contencioso), custodia y régimen de visitas, pensión alimenticia, reconocimiento de paternidad, sucesiones y herencias, adopciones, y violencia doméstica. Brindamos acompañamiento emocional y legal durante estos procesos sensibles.',
      color: 'pink',
    },
    {
      id: 'propiedad',
      name: 'Propiedad Intelectual',
      icon: <Copyright size={48} />,
      description: 'Marcas, patentes, derechos de autor, contratos comerciales',
      priceRange: '$300 - $600',
      details: 'Nuestro servicio de propiedad intelectual incluye: registro de marcas y patentes, protección de derechos de autor, contratos de licencia y franquicia, defensa contra infracciones, negociación de acuerdos de confidencialidad, y asesoría en propiedad intelectual para startups y emprendedores. Especializados en proteger tus activos intangibles.',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      pink: 'bg-pink-50 border-pink-200 text-pink-600',
      purple: 'bg-purple-50 border-purple-200 text-purple-600',
    };
    return colors[color] || 'bg-gray-50 border-gray-200 text-gray-600';
  };

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-wine text-center mb-4">
          Servicios por Área
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Patrocinio legal especializado con tarifas transparentes
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-100"
            >
              <div className={`${getColorClasses(service.color)} p-4 rounded-lg mb-6 inline-block`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-wine mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="text-wine" size={20} />
                <span className="font-semibold text-wine">{service.priceRange}</span>
              </div>
              <button
                onClick={() => setSelectedService(service)}
                className="w-full bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all flex items-center justify-center gap-2"
              >
                <Info size={20} />
                Más Información
              </button>
            </div>
          ))}
        </div>

        {/* Modal de Información Detallada */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-wine mb-2">
                    {selectedService.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="text-wine" size={20} />
                    <span className="font-semibold text-wine text-lg">
                      {selectedService.priceRange}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-wine text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className={`${getColorClasses(selectedService.color)} p-6 rounded-lg mb-6`}>
                {selectedService.icon}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedService.details}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedService(null)}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setSelectedServiceArea(selectedService.name);
                    setSelectedService(null);
                    setShowVideoModal(true);
                  }}
                  className="flex-1 bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all"
                >
                  Solicitar Consulta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Videollamada */}
        {showVideoModal && (
          <VideoCallModal
            isOpen={showVideoModal}
            onClose={() => {
              setShowVideoModal(false);
              setSelectedServiceArea('');
            }}
            duration="30"
            type="service"
            serviceArea={selectedServiceArea}
          />
        )}
      </div>
    </section>
  );
}

