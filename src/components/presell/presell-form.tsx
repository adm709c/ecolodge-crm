'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Leaf } from 'lucide-react';
import { createReservation } from '@/lib/supabase';

interface PresellFormProps {
  whatsappNumber: string;
}

export function PresellForm({ whatsappNumber }: PresellFormProps) {
  const searchParams = useSearchParams();
  const [gclid, setGclid] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const gclid = searchParams.get('gclid') || '';
    setGclid(gclid);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    // Salvar lead no CRM (sem bloquear o redirect)
    const newLead = {
      guest_name: formData.name,
      check_in: new Date().toISOString().split('T')[0],
      check_out: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      people: 1,
      value: 0,
      source: 'google_ads',
      status: 'new_lead',
      phone: formData.phone,
      gclid: gclid,
    };

    // Salvar no background (não espera resposta)
    createReservation(newLead).catch(err => {
      console.warn('Erro ao salvar no CRM:', err);
    });

    // Preparar mensagem para WhatsApp com dados do lead
    const message = `Olá! Meu nome é ${formData.name} e meu WhatsApp é ${formData.phone}. Vim do Google e gostaria de agendar uma reserva!`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Redirecionar para WhatsApp imediatamente
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 100);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-elevated p-6 sm:p-8 border border-sage-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-eco-500 to-sage-600 flex items-center justify-center text-white">
            <Leaf size={24} className="sm:w-7 sm:h-7" />
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif text-lg sm:text-2xl font-bold text-charcoal mb-2">
            Eco Lodge Praia de Gravatá
          </h1>
          <p className="text-sage-600 text-xs sm:text-sm">
            Preencha seus dados para falar conosco no WhatsApp
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-sage-700 mb-2">
              Seu Nome *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Maria Silva"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500 placeholder-sage-400"
            />
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-sage-700 mb-2">
              Seu WhatsApp *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(85) 99999-9999"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500 placeholder-sage-400"
            />
          </div>

          {/* gclid hidden info */}
          {gclid && (
            <p className="text-xs text-sage-500 text-center">
              ID de campanha capturado: {gclid.substring(0, 20)}...
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-eco-500 hover:bg-eco-600 disabled:bg-sage-400 text-white font-semibold py-2 sm:py-2.5 text-sm sm:text-base rounded-lg transition-smooth flex items-center justify-center gap-2 mt-6"
          >
            <Send size={18} />
            {isLoading ? 'Processando...' : 'Conversar no WhatsApp'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-sage-500 text-center mt-4">
          Seus dados serão salvos e você será redirecionado para o WhatsApp
        </p>
      </div>
    </div>
  );
}
