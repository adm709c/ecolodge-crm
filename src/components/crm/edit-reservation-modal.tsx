'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface Reservation {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  people: number;
  value: number;
  source: 'google_business' | 'google_organic' | 'google_ads' | 'instagram' | 'direct';
  gclid?: string;
}

interface EditReservationModalProps {
  isOpen: boolean;
  reservation?: Reservation;
  onClose: () => void;
  onSave?: (reservation: Reservation) => void;
}

export function EditReservationModal({ isOpen, reservation, onClose, onSave }: EditReservationModalProps) {
  const [formData, setFormData] = useState<Reservation | undefined>(reservation);

  useEffect(() => {
    setFormData(reservation);
  }, [reservation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'people' || name === 'value' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave?.(formData);
      onClose();
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-charcoal">Editar Reserva</h2>
            <button
              type="button"
              onClick={onClose}
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
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Fonte */}
                <div>
                  <label htmlFor="source" className="block text-sm font-semibold text-sage-700 mb-2">
                    Origem
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  >
                    <option value="google_ads">Google Ads</option>
                  </select>
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
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-semibold text-sage-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                  />
                </div>

                {/* Número de Pessoas */}
                <div>
                  <label htmlFor="people" className="block text-sm font-semibold text-sage-700 mb-2">
                    Número de Pessoas
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

            {/* Seção 3: Valor */}
            <fieldset className="border-b border-sage-100 pb-6">
              <legend className="font-serif font-bold text-charcoal mb-4 text-lg">
                Valor da Reserva
              </legend>

              <div>
                <label htmlFor="value" className="block text-sm font-semibold text-sage-700 mb-2">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>
            </fieldset>

            {/* Seção 4: gclid (opcional) */}
            <fieldset>
              <legend className="font-serif font-bold text-charcoal mb-4 text-lg">
                Rastreamento
              </legend>

              <div>
                <label htmlFor="gclid" className="block text-sm font-semibold text-sage-700 mb-2">
                  Google Click ID (gclid) - Opcional
                </label>
                <input
                  type="text"
                  id="gclid"
                  name="gclid"
                  value={formData.gclid || ''}
                  onChange={handleChange}
                  placeholder="ID de rastreamento do Google Ads"
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500 text-xs"
                />
                <p className="text-xs text-sage-500 mt-2">Preenchido automaticamente para leads do Google Ads</p>
              </div>
            </fieldset>

            {/* Botões */}
            <div className="flex gap-4 justify-end pt-6 border-t border-sage-100">
              <button
                type="button"
                onClick={onClose}
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
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
