'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  available: boolean;
  description?: string;
  experience?: string;
  image: string;
}

export default function Lawyers() {
  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Dra. María González',
      specialty: 'Laboral',
      available: true,
      rating: 4.9,
      image: '/lawyer-1.jpg',
      description: 'Especialista en conflictos laborales y derechos de trabajadores. Experta en negociaciones empresariales y defensa legal en juicios laborales.',
      experience: '15+ años',
    },
    {
      id: '2',
      name: 'Dra. Lenny Apolinario',
      specialty: 'Familiar',
      available: true,
      rating: 4.8,
      image: '/lawyer-2.jpg',
      description: 'Dedicada a casos de divorcio, custodia y herencias. Enfoque sensible y humanitario en procesos legales familiares complejos.',
      experience: '12+ años',
    },
    {
      id: '3',
      name: 'Dra. Ana Martínez',
      specialty: 'Propiedad Intelectual',
      available: true,
      rating: 4.9,
      image: '/lawyer-3.jpg',
      description: 'Experta en registro de marcas, patentes y derechos de autor. Asesora de startups en protección de activos intangibles.',
      experience: '10+ años',
    },
  ];

  return (
    <section id="abogados" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wine mb-4">
            Nuestro Equipo Legal
          </h2>
          <p className="text-center text-gray-600 text-lg">
            Abogados especializados y certificados listos para asesorarte
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-100 p-6"
            >
              {/* Header con imagen circular y nombre */}
              <div className="flex items-center gap-4 mb-4">
                {/* Imagen circular */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    fill
                    className="object-cover rounded-full"
                    priority
                  />
                </div>

                {/* Nombre y especialidad */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-wine">
                    {lawyer.name}
                  </h3>
                  <p className="text-wine font-semibold text-sm">
                    {lawyer.specialty}
                  </p>
                  {lawyer.available && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold inline-block mt-1">
                      Disponible
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(lawyer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">{lawyer.rating}</span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {lawyer.description}
              </p>
              
              {/* Experiencia */}
              <p className="text-gray-500 text-xs font-semibold">
                Experiencia: {lawyer.experience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
