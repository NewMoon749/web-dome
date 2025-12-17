'use client';

import { X, Video, Calendar, Clock, User, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Reiniciar selectedArea cuando cambia serviceArea
  useEffect(() => {
    if (serviceArea) {
      setSelectedArea(serviceArea);
    }
  }, [serviceArea]);

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

  // Horarios disponibles
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ];

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (number | null)[] = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const isDateSelectable = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return dateToCheck >= today;
  };

  const handleDateSelect = (day: number) => {
    if (isDateSelectable(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const prevMonth = () => {
    const today = new Date();
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (newMonth.getFullYear() > today.getFullYear() || 
        (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() >= today.getMonth())) {
      setCurrentMonth(newMonth);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

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
          ) : callType === 'schedule' && (!selectedDate || !selectedTime) ? (
            // Calendario para programar cita
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-wine mb-4">
                Selecciona fecha y hora para tu consulta
              </h3>
              
              {/* Calendario */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-wine/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="text-wine" size={20} />
                  </button>
                  <h4 className="font-bold text-wine text-lg">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-wine/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="text-wine" size={20} />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((day, index) => (
                    <div key={index} className="aspect-square">
                      {day !== null && (
                        <button
                          onClick={() => handleDateSelect(day)}
                          disabled={!isDateSelectable(day)}
                          className={`w-full h-full flex items-center justify-center rounded-lg text-sm transition-all
                            ${selectedDate?.getDate() === day && 
                              selectedDate?.getMonth() === currentMonth.getMonth() &&
                              selectedDate?.getFullYear() === currentMonth.getFullYear()
                              ? 'bg-wine text-white font-bold'
                              : isDateSelectable(day)
                                ? 'hover:bg-wine/10 text-gray-700'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                        >
                          {day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Selección de hora */}
              {selectedDate && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-wine flex items-center gap-2">
                    <Clock size={18} />
                    Selecciona la hora
                  </h4>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all
                          ${selectedTime === time
                            ? 'bg-wine text-white'
                            : 'bg-gray-100 hover:bg-wine/10 text-gray-700'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen de selección */}
              {selectedDate && selectedTime && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-green-800 font-medium">
                    📅 {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {selectedTime}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedLawyer(null);
                    setSelectedDate(null);
                    setSelectedTime('');
                  }}
                  className="text-wine hover:text-wine-dark font-medium"
                >
                  ← Volver
                </button>
                {selectedDate && selectedTime && (
                  <button
                    onClick={() => {}}
                    className="flex-1 bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all"
                  >
                    Continuar
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Confirmación
            <div className="space-y-6 text-center">
              <div className="bg-green-50 p-6 rounded-lg">
                <Check className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-wine mb-2">
                  {callType === 'now' ? 'Videollamada Lista' : 'Cita Programada'}
                </h3>
                <div className="space-y-2 text-gray-700 text-left">
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
                  {callType === 'schedule' && selectedDate && selectedTime && (
                    <>
                      <p>
                        <span className="font-semibold">Fecha:</span>{' '}
                        {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p>
                        <span className="font-semibold">Hora:</span> {selectedTime}
                      </p>
                    </>
                  )}
                  <p>
                    <span className="font-semibold">Tipo:</span>{' '}
                    {callType === 'now' ? 'Inmediata' : 'Programada'}
                  </p>
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
                  onClick={onClose}
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

