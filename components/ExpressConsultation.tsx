'use client';

import { Video, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import VideoCallModal from './VideoCallModal';

export default function ExpressConsultation() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<'30' | '90' | null>(null);

  const plans = [
    {
      duration: '30' as const,
      minutes: '30 minutos',
      price: 15,
      description: 'Consulta rápida para dudas específicas',
    },
    {
      duration: '90' as const,
      minutes: '1 hora 30 minutos',
      price: 35,
      description: 'Consulta completa y detallada',
    },
  ];

  const handleSelectPlan = (duration: '30' | '90') => {
    // Resetear estados anteriores antes de abrir el modal de pago
    setShowVideoCallModal(false);
    setSelectedDuration(duration);
    setShowPaymentModal(true);
  };

  return (
    <>
      <section id="consultas-express" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-wine text-center mb-4">
            Consultas Express
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Consulta rápida con abogado especialista por videollamada
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.duration}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-wine"
              >
                <div className="text-center mb-6">
                  <div className="bg-wine/10 p-4 rounded-full inline-block mb-4">
                    <Video className="text-wine" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-wine mb-2">
                    {plan.minutes}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <Clock size={20} />
                    <span>{plan.minutes}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="text-wine" size={24} />
                    <span className="text-4xl font-bold text-wine">${plan.price}</span>
                    <span className="text-gray-500 text-lg">USD</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.duration)}
                  className="w-full bg-wine text-white px-6 py-3 rounded-lg font-semibold hover:bg-wine-dark transition-all"
                >
                  Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Pago - Primero debe pagar */}
      {showPaymentModal && selectedDuration && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            // Si el modal se cierra sin completar el pago, resetear todo
            setShowPaymentModal(false);
            setSelectedDuration(null);
            setShowVideoCallModal(false);
          }}
          service={{
            id: `express-${selectedDuration}`,
            name: `Consulta Express - ${selectedDuration === '30' ? '30 minutos' : '1 hora 30 minutos'}`,
            priceRange: `$${plans.find(p => p.duration === selectedDuration)?.price || 0}`,
            color: 'blue',
          }}
          duration={selectedDuration}
          type="express"
          onPaymentComplete={() => {
            // Cerrar modal de pago primero
            setShowPaymentModal(false);
            // Luego abrir modal de videollamada después de un breve delay
            setTimeout(() => {
              setShowVideoCallModal(true);
            }, 200);
          }}
        />
      )}

      {/* Modal de Videollamada - Se abre SOLO después del pago completo */}
      {showVideoCallModal && selectedDuration && !showPaymentModal && (
        <VideoCallModal
          isOpen={showVideoCallModal}
          onClose={() => {
            setShowVideoCallModal(false);
            setSelectedDuration(null);
            setShowPaymentModal(false);
          }}
          duration={selectedDuration}
          type="express"
        />
      )}
    </>
  );
}
