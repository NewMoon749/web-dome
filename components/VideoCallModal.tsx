'use client';

import { X, Video, Calendar, Clock, User, Check, CalendarDays } from 'lucide-react';
import { useState } from 'react';

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  rating: number;
}

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration: '30' | '90';
  type: 'express' | 'service';
  serviceArea?: string;
}

export default function VideoCallModal({
  isOpen,
  onClose,
  duration,
  type,
  serviceArea,
}: VideoCallModalProps) {
  const [callType, setCallType] = useState<'now' | 'schedule' | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>(serviceArea || '');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const areas = [
    { id: 'laboral', name: 'Laboral' },
    { id: 'familiar', name: 'Familiar' },
    { id: 'propiedad', name: 'Propiedad Intelectual' },
  ];

  // Abogados de ejemplo
  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Dra. María González',
      specialty: 'Laboral',
      available: true,
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Dra. Lenny Apolinario',
      specialty: 'Familiar',
      available: true,
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Dra. Ana Martínez',
      specialty: 'Propiedad Intelectual',
      available: true,
      rating: 4.9,
    },
  ];

  const filteredLawyers = selectedArea
    ? lawyers.filter((lawyer) => lawyer.specialty.toLowerCase() === selectedArea.toLowerCase())
    : lawyers;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-wine text-white p-6 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Videollamada</h2>
            <p className="text-white/80">
              {duration === '30' ? '30 minutos' : '1 hora 30 minutos'} -{' '}
              {type === 'express' ? 'Consulta Express' : 'Servicio Especializado'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-wine-dark p-2 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!callType ? (
            // Selección de tipo de videollamada
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine mb-6">
                ¿Cuándo deseas realizar la videollamada?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setCallType('now')}
                  className="p-6 border-2 border-wine rounded-lg hover:bg-wine/5 transition-all text-left group"
                >
                  <Video className="text-wine mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-wine text-lg mb-2">Realizar Ahora</h4>
                  <p className="text-gray-600">
                    Conecta inmediatamente con un abogado disponible
                  </p>
                </button>
                <button
                  onClick={() => setCallType('schedule')}
                  className="p-6 border-2 border-wine rounded-lg hover:bg-wine/5 transition-all text-left group"
                >
                  <Calendar className="text-wine mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-wine text-lg mb-2">Programar</h4>
                  <p className="text-gray-600">
                    Agenda tu videollamada para un momento conveniente
                  </p>
                </button>
              </div>
            </div>
          ) : !selectedArea ? (
            // Selección de área
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine mb-6">
                Selecciona el área de especialización
              </h3>
              <div className="grid gap-4">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.name)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-wine hover:bg-wine/5 transition-all text-left"
                  >
                    <span className="font-semibold text-wine">{area.name}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCallType(null)}
                className="text-wine hover:text-wine-dark font-medium"
              >
                ← Volver
              </button>
            </div>
          ) : !selectedLawyer ? (
            // Selección de abogado
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wine mb-6">
                Abogados disponibles en {selectedArea}
              </h3>
              <div className="space-y-3">
                {filteredLawyers.map((lawyer) => (
                  <button
                    key={lawyer.id}
                    onClick={() => setSelectedLawyer(lawyer)}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-wine hover:bg-wine/5 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-wine/10 p-3 rounded-full">
                          <User className="text-wine" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-wine">{lawyer.name}</h4>
                          <p className="text-gray-600">{lawyer.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">{lawyer.rating}</span>
                          </div>
                        </div>
                      </div>
                      {lawyer.available && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Check size={20} />
                          <span className="font-semibold">Disponible</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedArea('')}
                className="text-wine hover:text-wine-dark font-medium"
              >
                ← Volver
              </button>
            </div>
          ) : callType === 'schedule' && (!selectedDate || !selectedTime) && selectedLawyer ? (
            // Selección de fecha y hora (solo si es programada)
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-wine mb-6">
                Selecciona fecha y hora
              </h3>
              
              {/* Información del abogado seleccionado */}
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-wine" size={20} />
                  <div>
                    <p className="font-semibold text-gray-800">{selectedLawyer.name}</p>
                    <p className="text-sm text-gray-600">{selectedArea}</p>
                  </div>
                </div>
              </div>

              {/* Selector de fecha */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <CalendarDays className="text-wine" size={20} />
                  Fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-wine focus:ring-2 focus:ring-wine/20 transition-all text-gray-800"
                />
              </div>

              {/* Selector de hora */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Clock className="text-wine" size={20} />
                  Hora
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-wine focus:ring-2 focus:ring-wine/20 transition-all text-gray-800"
                />
                <p className="text-sm text-gray-500">
                  Horario disponible: 9:00 AM - 6:00 PM
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedLawyer(null);
                    setSelectedDate('');
                    setSelectedTime('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  ← Volver
                </button>
                <button
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                  onClick={() => {
                    // El botón está deshabilitado hasta que se seleccionen fecha y hora
                    // Cuando ambos están seleccionados, automáticamente se muestra la confirmación
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          ) : (
            // Confirmación
            <div className="space-y-6 text-center">
              <div className="bg-green-50 p-6 rounded-lg">
                <Check className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-wine mb-2">
                  Videollamada Confirmada
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Abogado:</span> {selectedLawyer.name}
                  </p>
                  <p>
                    <span className="font-semibold">Área:</span> {selectedArea}
                  </p>
                  <p>
                    <span className="font-semibold">Duración:</span>{' '}
                    {duration === '30' ? '30 minutos' : '1 hora 30 minutos'}
                  </p>
                  <p>
                    <span className="font-semibold">Tipo:</span>{' '}
                    {callType === 'now' ? 'Inmediata' : 'Programada'}
                  </p>
                  {callType === 'schedule' && selectedDate && selectedTime && (
                    <>
                      <p>
                        <span className="font-semibold">Fecha:</span>{' '}
                        {new Date(selectedDate).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p>
                        <span className="font-semibold">Hora:</span>{' '}
                        {selectedTime}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    // Aquí iría la lógica para iniciar la videollamada
                    alert('Iniciando videollamada...');
                    onClose();
                  }}
                  className="flex-1 bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all"
                >
                  {callType === 'now' ? 'Iniciar Videollamada' : 'Confirmar Cita'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

