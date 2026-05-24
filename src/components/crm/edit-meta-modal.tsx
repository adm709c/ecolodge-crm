'use client';

import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface EditMetaModalProps {
  isOpen: boolean;
  currentMeta: number;
  onClose: () => void;
  onSave?: (meta: number) => void;
}

export function EditMetaModal({ isOpen, currentMeta, onClose, onSave }: EditMetaModalProps) {
  const [meta, setMeta] = useState(currentMeta);

  useEffect(() => {
    setMeta(currentMeta);
  }, [currentMeta, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(meta);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-elevated max-w-sm w-full">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-charcoal">Editar Meta de Reservas</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-sage-600 hover:text-charcoal transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="meta" className="block text-sm font-semibold text-sage-700 mb-2">
              Meta de Reservas (número de reservas)
            </label>
            <input
              type="number"
              id="meta"
              value={meta}
              onChange={(e) => setMeta(Number(e.target.value))}
              min="0"
              className="w-full px-4 py-2 border border-sage-200 rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-eco-500"
            />
          </div>

          <div className="flex gap-4 justify-end">
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
