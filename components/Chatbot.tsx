'use client';

import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente virtual de EX LEGE-ON. ¿En qué puedo ayudarte hoy? Puedo orientarte sobre nuestros servicios, consultas express o conectarte con un asesor especializado.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): { text: string; escalate?: boolean } => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('consulta express') || lowerInput.includes('videollamada')) {
      return {
        text: 'Ofrecemos Consultas Express por videollamada: 30 minutos por $15 o 1 hora 30 minutos por $35. ¿Te gustaría agendar una ahora o programarla para después?',
      };
    }

    if (lowerInput.includes('servicio') || lowerInput.includes('área') || lowerInput.includes('patrocinio')) {
      return {
        text: 'Tenemos servicios especializados en tres áreas:\n\n• Laboral ($150-$400): Contratos, despidos, relaciones laborales\n• Familiar ($200-$500): Divorcios, custodia, herencias\n• Propiedad Intelectual ($300-$600): Marcas, patentes, derechos de autor\n\n¿Cuál área te interesa?',
      };
    }

    if (lowerInput.includes('precio') || lowerInput.includes('costo') || lowerInput.includes('tarifa')) {
      return {
        text: 'Nuestros precios son transparentes y fijos:\n\n• Consultas Express: $15 (30 min) o $35 (90 min)\n• Patrocinio Legal: Desde $150 hasta $600 según el área\n\n¿Te gustaría más información sobre algún servicio específico?',
      };
    }

    if (lowerInput.includes('horario') || lowerInput.includes('disponible') || lowerInput.includes('cuando')) {
      return {
        text: 'Nuestros horarios son:\n\n• Atención General: Lunes a Sábados 8 AM - 11 PM\n• Chat y WhatsApp: Disponible 24/7\n\n¿En qué horario te gustaría agendar tu consulta?',
      };
    }

    if (
      lowerInput.includes('no entiendo') ||
      lowerInput.includes('no sé') ||
      lowerInput.includes('ayuda') ||
      lowerInput.includes('complejo') ||
      lowerInput.includes('específico')
    ) {
      return {
        text: 'Entiendo que tu consulta requiere atención especializada. Voy a conectarte con uno de nuestros asesores guía que podrá ayudarte mejor. Por favor, espera un momento...',
        escalate: true,
      };
    }

    return {
      text: 'Gracias por tu consulta. Para darte la mejor orientación, ¿podrías ser más específico? Puedo ayudarte con información sobre consultas express, servicios por área, precios u horarios. Si tu consulta es compleja, puedo conectarte con un asesor especializado.',
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-wine text-white p-4 rounded-full shadow-lg hover:bg-wine-dark transition-all transform hover:scale-110 z-40"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border-2 border-wine">
          {/* Header */}
          <div className="bg-wine text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-bold">Asistente EX LEGE-ON</h3>
                <p className="text-xs text-white/80">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-wine-dark p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="bg-wine/10 p-2 rounded-full">
                    <Bot size={16} className="text-wine" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-wine text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wine focus:border-transparent outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-wine text-white p-2 rounded-lg hover:bg-wine-dark transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

