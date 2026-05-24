'use client';

import { useState, useEffect } from 'react';
import { Calendar, Target, Edit2, ExternalLink } from 'lucide-react';
import { EditMetaModal } from './edit-meta-modal';
import { getMeta, updateMeta } from '@/lib/supabase';

export function CRMHeader() {
  const [meta, setMeta] = useState(28);
  const [confirmed, setConfirmed] = useState(12);
  const [isEditMetaOpen, setIsEditMetaOpen] = useState(false);
  const progressPercent = Math.round((confirmed / meta) * 100);

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Carregar meta do Supabase
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const metaValue = await getMeta();
        setMeta(metaValue);
      } catch (error) {
        console.error('Erro ao carregar meta:', error);
      }
    };
    loadMeta();
  }, []);

  const handleSaveMeta = async (newMeta: number) => {
    try {
      await updateMeta(newMeta);
      setMeta(newMeta);
    } catch (error) {
      console.error('Erro ao atualizar meta:', error);
    }
  };

  return (
    <header className="bg-white border-b border-sage-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-charcoal mb-2">CRM de Reservas</h1>
            <p className="text-sage-600 text-sm">
              Jornada do Hóspede - Kanban de Atendimento
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-3">
            <div>
              <p className="text-sm text-sage-600 capitalize">{currentDate}</p>
              <p className="text-xs text-sage-500">Última atualização: agora</p>
            </div>
            <a
              href="/presell"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-eco-500 text-white hover:bg-eco-600 rounded-lg transition-colors shadow-soft"
            >
              <ExternalLink size={16} />
              Ver Presell
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsEditMetaOpen(true)}
            className="bg-eco-50 rounded-lg p-4 border border-eco-200 flex items-center gap-4 hover:bg-eco-100 transition-colors text-left group"
          >
            <Target className="text-eco-500" size={24} flex-shrink-0 />
            <div className="flex-1">
              <p className="text-xs text-sage-600 font-semibold">Meta de Reservas</p>
              <p className="text-xl font-bold text-eco-700">{meta} reservas</p>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-sage-600">{confirmed} de {meta}</p>
                  <p className="text-xs font-semibold text-eco-700">{progressPercent}%</p>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-eco-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <Edit2 className="text-eco-600 flex-shrink-0 group-hover:text-eco-700 transition-colors" size={20} />
          </button>

          <div className="bg-sand-50 rounded-lg p-4 border border-sand-200 flex items-center gap-4">
            <Calendar className="text-sand-500" size={24} />
            <div>
              <p className="text-xs text-sage-600 font-semibold">Reservas no Pipeline</p>
              <p className="text-xl font-bold text-sand-700">18 reservas</p>
              <p className="text-xs text-sage-600">Aguardando confirmação</p>
            </div>
          </div>
        </div>

        <EditMetaModal
          isOpen={isEditMetaOpen}
          currentMeta={meta}
          onClose={() => setIsEditMetaOpen(false)}
          onSave={handleSaveMeta}
        />
      </div>
    </header>
  );
}