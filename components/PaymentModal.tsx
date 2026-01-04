'use client';

import { X, CreditCard, Wallet, Check, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  priceRange: string;
  color: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  duration?: '30' | '90';
  type?: 'express' | 'service';
  onPaymentComplete?: () => void;
}

export default function PaymentModal({ isOpen, onClose, service, duration = '90', type = 'service', onPaymentComplete }: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Tarjeta de Crédito/Débito',
      icon: <CreditCard size={24} />,
      description: 'Visa, Mastercard, American Express',
    },
    {
      id: 'digital',
      name: 'Billetera Digital',
      icon: <Wallet size={24} />,
      description: 'PayPal, Stripe, Mercado Pago',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      blue: {
        bg: 'bg-blue-600',
        border: 'border-blue-500',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-700',
      },
      pink: {
        bg: 'bg-pink-600',
        border: 'border-pink-500',
        text: 'text-pink-600',
        hover: 'hover:bg-pink-700',
      },
      purple: {
        bg: 'bg-purple-600',
        border: 'border-purple-500',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-700',
      },
    };
    return colors[color] || {
      bg: 'bg-wine',
      border: 'border-wine',
      text: 'text-wine',
      hover: 'hover:bg-wine-dark',
    };
  };

  const colorClasses = getColorClasses(service.color);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simular procesamiento de pago con animación
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleContinueToSchedule = () => {
    // Resetear estados internos
    setIsComplete(false);
    setSelectedPaymentMethod(null);
    // Ejecutar el callback para abrir el VideoCallModal (esto cerrará este modal y abrirá el otro)
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  const handleClose = () => {
    setIsComplete(false);
    setSelectedPaymentMethod(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fadeIn">
        <div className="bg-white rounded-xl max-w-2xl w-full border border-gray-200 shadow-2xl overflow-hidden animate-slideUp transform transition-all">
          {/* Header estilo Epic Games - Tema Claro */}
          <div className={`${colorClasses.bg} p-6 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30"></div>
            <div className="relative flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 animate-fadeIn">
                  Reclamar Servicio
                </h2>
                <p className="text-white/90 text-lg">
                  {service.name}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-all duration-200 p-2 hover:bg-white/20 rounded-lg transform hover:scale-110"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Contenido - Tema Claro */}
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            {!isComplete ? (
              <>
                {/* Información del servicio */}
                <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 shadow-md animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Servicio Seleccionado</h3>
                    <div className={`${colorClasses.bg} px-4 py-2 rounded-full shadow-md transform hover:scale-105 transition-transform`}>
                      <span className="text-white font-semibold">{service.name}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-800">{service.priceRange}</span>
                    <span className="text-gray-500 font-medium">USD</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    Consulta legal especializada con abogado certificado
                  </p>
                </div>

                {/* Métodos de pago */}
                <div className="mb-6 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Lock size={20} className={`${colorClasses.text}`} />
                    Selecciona un método de pago
                  </h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method, index) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] animate-fadeIn ${
                          selectedPaymentMethod === method.id
                            ? `${colorClasses.border} bg-opacity-5 border-2 shadow-md`
                            : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
                        }`}
                        style={{ 
                          animationDelay: `${(index + 1) * 100}ms`,
                          animationFillMode: 'both',
                          ...(selectedPaymentMethod === method.id && colorClasses.bg.includes('blue') ? { backgroundColor: 'rgba(37, 99, 235, 0.05)' } : {}),
                          ...(selectedPaymentMethod === method.id && colorClasses.bg.includes('pink') ? { backgroundColor: 'rgba(219, 39, 119, 0.05)' } : {}),
                          ...(selectedPaymentMethod === method.id && colorClasses.bg.includes('purple') ? { backgroundColor: 'rgba(147, 51, 234, 0.05)' } : {}),
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg transition-all duration-300 ${
                                selectedPaymentMethod === method.id
                                  ? `${colorClasses.bg} text-white shadow-md transform scale-110`
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              {method.icon}
                            </div>
                            <div>
                              <h4 className={`font-semibold mb-1 ${selectedPaymentMethod === method.id ? 'text-gray-800' : 'text-gray-700'}`}>
                                {method.name}
                              </h4>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <div className={`${colorClasses.bg} p-2 rounded-full shadow-md animate-bounceIn`}>
                              <Check size={20} className="text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advertencia de seguridad */}
                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl flex items-start gap-3 animate-fadeIn shadow-sm" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                  <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-700 text-sm font-medium mb-1">
                      Pago seguro y encriptado
                    </p>
                    <p className="text-blue-600/80 text-xs">
                      Tus datos de pago están protegidos con encriptación de nivel bancario.
                      No almacenamos información de tarjetas.
                    </p>
                  </div>
                </div>

                {/* Botón de pago */}
                <div className="flex gap-4 animate-fadeIn" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 border-2 border-transparent hover:border-gray-300 transform hover:scale-[1.02]"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod || isProcessing}
                    className={`flex-1 ${
                      selectedPaymentMethod && !isProcessing
                        ? `${colorClasses.bg} ${colorClasses.hover} text-white shadow-lg hover:shadow-xl`
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } px-6 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:transform-none`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Proceder al Pago
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Pantalla de éxito estilo Epic Games - Tema Claro */
              <div className="text-center py-8 animate-fadeIn">
                <div className="mb-6">
                  <div className={`${colorClasses.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounceIn`}>
                    <Check size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2 animate-slideUp" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                    ¡Consulta Reclamada!
                  </h3>
                  <p className="text-gray-600 mb-6 animate-fadeIn" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                    Tu servicio de {service.name} ha sido agregado a tu cuenta
                  </p>
                </div>

                <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 shadow-md animate-slideUp" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Servicio:</span>
                      <span className="text-gray-800 font-semibold">{service.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Método de pago:</span>
                      <span className="text-gray-800 font-semibold">
                        {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Monto:</span>
                      <span className="text-gray-800 font-semibold text-lg">{service.priceRange} USD</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                  <button
                    onClick={handleContinueToSchedule}
                    className={`w-full ${colorClasses.bg} ${colorClasses.hover} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2`}
                  >
                    Continuar con la Consulta
                    <ArrowRight size={20} />
                  </button>
                  <p className="text-gray-500 text-sm">
                    Recibirás un correo con los detalles de tu consulta
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}
