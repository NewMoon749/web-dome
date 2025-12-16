'use client';

import { Target, Eye, Users, DollarSign, Clock, Shield, Heart, Globe, MessageCircle } from 'lucide-react';

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-wine text-center mb-16">
          Nosotros
        </h2>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-wine text-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Target size={32} />
              <h3 className="text-2xl font-bold">Misión</h3>
            </div>
            <p className="text-lg leading-relaxed">
              "Democratizar el acceso a la justicia preventiva y la asesoría legal especializada, a través de una plataforma digital, inmediata y transparente. Nuestro propósito es eliminar las barreras logísticas y financieras ofreciendo un modelo de tarifas fijas que permita a profesionales, emprendedores y usuarios con limitaciones de tiempo obtener la orientación que necesitan sin compromiso."
            </p>
          </div>

          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={32} />
              <h3 className="text-2xl font-bold">Visión</h3>
            </div>
            <p className="text-lg leading-relaxed">
              "Aspiramos ser una plataforma líder, logrando que el acceso a la asesoría especializada sea un recurso habitual, accesible y de confianza para todos los ciudadanos y pequeños negocios, eliminando la necesidad de que la ley sea un servicio de último recurso."
            </p>
          </div>
        </div>

        {/* Segmentos Objetivo */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-wine text-center mb-8">
            Nuestra plataforma está diseñada para aquellos que valoran el tiempo, la transparencia y el acceso inmediato a la ley
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-wine text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Segmento</th>
                  <th className="px-6 py-4 text-left font-semibold">Característica Principal</th>
                  <th className="px-6 py-4 text-left font-semibold">La Barrera que Eliminamos</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-wine">Profesionales y Emprendedores</td>
                  <td className="px-6 py-4">Personas con rigidez horaria o doble jornada que no pueden sacrificar tiempo de trabajo para trámites presenciales.</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">La Barrera del Tiempo</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-wine">Individuos con Limitaciones de Movilidad</td>
                  <td className="px-6 py-4">Usuarios que enfrentan barreras de distancia (zonas remotas) o impedimentos de movilidad (físicos).</td>
                  <td className="px-6 py-4 font-semibold text-purple-600">La Barrera Logística y Geográfica</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-wine">Usuarios Conscientes del Costo</td>
                  <td className="px-6 py-4">Quienes requieren justicia preventiva pero evitan el riesgo financiero de las tarifas legales inciertas.</td>
                  <td className="px-6 py-4 font-semibold text-green-600">La Barrera del Costo Desconocido</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Herramientas */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-wine text-center mb-8">
            Herramientas
          </h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Un resumen de lo que hay en la plataforma
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Clock className="text-wine mb-4" size={40} />
              <h4 className="font-bold text-wine mb-2">Consultas Express</h4>
              <p className="text-gray-600">Videollamadas rápidas de 30 min o 90 min con abogados especializados</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Shield className="text-wine mb-4" size={40} />
              <h4 className="font-bold text-wine mb-2">Patrocinio Legal</h4>
              <p className="text-gray-600">Servicios especializados por área: Laboral, Familiar, Propiedad Intelectual</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <MessageCircle className="text-wine mb-4" size={40} />
              <h4 className="font-bold text-wine mb-2">Chatbot Inteligente</h4>
              <p className="text-gray-600">Asistente virtual disponible 24/7 para guiar tus consultas</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Users className="text-wine mb-4" size={40} />
              <h4 className="font-bold text-wine mb-2">Abogados Especializados</h4>
              <p className="text-gray-600">Acceso directo a profesionales certificados en cada área</p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-3xl font-bold text-wine text-center mb-8">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Shield className="text-blue-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-wine text-xl mb-2">Confianza</h4>
              <p className="text-gray-600">Profesionales certificados y servicios transparentes</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Globe className="text-green-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-wine text-xl mb-2">Accesibilidad</h4>
              <p className="text-gray-600">Servicios disponibles para todos, sin barreras</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Users className="text-purple-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-wine text-xl mb-2">Inclusión</h4>
              <p className="text-gray-600">Eliminamos barreras geográficas y físicas</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <Heart className="text-pink-600 mx-auto mb-4" size={48} />
              <h4 className="font-bold text-wine text-xl mb-2">Empatía</h4>
              <p className="text-gray-600">Entendemos tus necesidades y limitaciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

