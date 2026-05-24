'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewReservationModal({ isOpen, onClose }: NewReservationModalProps) {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    people: '2',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reserva criada (Google):', formData);
    setFormData({
      guestName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      people: '2',
      notes: '',
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      guestName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      people: '2',
      notes: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal">Nova Reserva</h2>
            <button
              type="button"
              onClick={handleCancel}
              className="text-sage-600 hover:text-charcoal transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Seção 1: Informações do Hóspede */}
            <fieldset className="border-b border-sage-100 pb-6">
              <legend className="font-serif font-bold text-charcoal mb-4 text-lg">
                Informações do Hóspede
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label htmlFor="guestName" className="block text-sm font-semibold text-sage-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Marina Silva"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-sage-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="marina@example.com"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Telefone */}
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-sage-700 mb-2">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(85) 99999-9999"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Seção 2: Datas e Hóspedes */}
            <fieldset className="border-b border-sage-100 pb-6">
              <legend className="font-serif font-bold text-charcoal mb-4 text-lg">
                Datas e Hóspedes
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Check-in */}
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-semibold text-sage-700 mb-2">
                    Check-in *
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-semibold text-sage-700 mb-2">
                    Check-out *
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Número de Pessoas */}
                <div>
                  <label htmlFor="people" className="block text-sm font-semibold text-sage-700 mb-2">
                    Número de Pessoas *
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Seção 3: Observações */}
            <fieldset>
              <legend className="font-serif font-bold text-charcoal mb-4 text-lg">
                Observações
              </legend>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-sage-700 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Adicione notas sobre preferências, requisitos especiais, etc..."
                  rows={4}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500 resize-none"
                />
              </div>
            </fieldset>

            {/* Botões */}
            <div className="flex gap-4 justify-end pt-6 border-t border-sage-100">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-charcoal border border-sage-200 hover:bg-sage-50 transition-smooth"
              >
                <X size={18} />
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-eco-500 text-white font-semibold hover:bg-eco-600 transition-smooth"
              >
                <Save size={18} />
                Criar Reserva
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
