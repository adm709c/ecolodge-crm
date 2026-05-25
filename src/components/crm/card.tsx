'use client';

import { Calendar, Users, DollarSign, Globe, Edit2, Trash2 } from 'lucide-react';

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

const sourceConfig = {
  google_business: { label: 'Google Meu Negócio', color: 'bg-blue-100 text-blue-800', icon: '🔍' },
  google_organic: { label: 'Google Orgânico', color: 'bg-indigo-100 text-indigo-800', icon: '🔎' },
  google_ads: { label: 'Google Ads', color: 'bg-purple-100 text-purple-800', icon: '📢' },
  instagram: { label: 'Instagram', color: 'bg-pink-100 text-pink-800', icon: '📸' },
  direct: { label: 'Direto', color: 'bg-gray-100 text-gray-800', icon: '✓' },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function calculateNights(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

interface KanbanCardProps {
  reservation: Reservation;
  onEdit?: (reservation: Reservation) => void;
  onDelete?: (reservationId: string) => void;
}

export function KanbanCard({ reservation, onEdit, onDelete }: KanbanCardProps) {
  const nights = calculateNights(reservation.checkIn, reservation.checkOut);
  const source = sourceConfig[reservation.source];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('🎯 Iniciando drag:', reservation.guestName);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/json', JSON.stringify(reservation));
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="bg-white rounded-lg p-3 border border-sage-200 shadow-sm hover:shadow-md transition-smooth cursor-grab active:cursor-grabbing group select-none"
    >
      {/* Header: Guest Name + Source Badge + Edit Button */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-charcoal text-xs truncate">
            {reservation.guestName}
          </h4>
          <p className="text-xs text-sage-500">{nights} noite(s)</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <div
            className={`px-1.5 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${source.color}`}
            title={source.label}
          >
            {source.icon}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(reservation);
            }}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 text-sage-600 hover:text-eco-600"
            title="Editar"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Tem certeza que deseja deletar este lead?')) {
                onDelete?.(reservation.id);
              }
            }}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 text-sage-600 hover:text-red-600"
            title="Deletar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-0.5 text-xs text-sage-700">
        {/* Dates */}
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className="text-sage-500 flex-shrink-0" />
          <span className="truncate">
            {formatDate(reservation.checkIn)} → {formatDate(reservation.checkOut)}
          </span>
        </div>

        {/* People */}
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-sage-500 flex-shrink-0" />
          <span>{reservation.people}p</span>
        </div>

        {/* Value */}
        <div className="flex items-center gap-1.5 font-semibold text-eco-700">
          <DollarSign size={12} className="text-eco-500 flex-shrink-0" />
          <span>R$ {reservation.value.toLocaleString('pt-BR')}</span>
        </div>

        {/* GCLID */}
        {reservation.gclid && (
          <div className="text-xs text-sage-400 truncate mt-1">
            gclid: {reservation.gclid.substring(0, 12)}...
          </div>
        )}
      </div>
    </div>
  );
}