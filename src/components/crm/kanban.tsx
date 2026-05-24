'use client';

import { useState, useEffect } from 'react';
import { KanbanCard } from './card';
import { NewReservationModal } from './new-reservation-modal';
import { EditReservationModal } from './edit-reservation-modal';
import { getAllReservations, updateReservation } from '@/lib/supabase';

interface Reservation {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  people: number;
  value: number;
  source: 'google_business' | 'google_organic' | 'google_ads' | 'instagram' | 'direct';
}

const columns = [
  {
    id: 'new_lead',
    title: 'Novo Lead',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    count: 0,
  },
  {
    id: 'in_service',
    title: 'Em Atendimento',
    color: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    count: 0,
  },
  {
    id: 'awaiting_payment',
    title: 'Aguardando Pagamento',
    color: 'bg-orange-50',
    borderColor: 'border-orange-200',
    count: 0,
  },
  {
    id: 'confirmed',
    title: 'Reserva Confirmada',
    color: 'bg-eco-50',
    borderColor: 'border-eco-200',
    count: 0,
  },
  {
    id: 'cancelled',
    title: 'Cancelado / Lost',
    color: 'bg-gray-50',
    borderColor: 'border-gray-200',
    count: 0,
  },
];

const mockReservations: Record<string, Reservation[]> = {
  new_lead: [],
  in_service: [],
  awaiting_payment: [],
  confirmed: [],
  cancelled: [],
};

interface KanbanBoardProps {
  onOpenNewReservation?: () => void;
}

export function KanbanBoard({ onOpenNewReservation }: KanbanBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | undefined>(undefined);
  const [allReservations, setAllReservations] = useState(mockReservations);

  useEffect(() => {
    // Carregar dados do Supabase
    const loadReservations = async () => {
      try {
        const data = await getAllReservations();

        // Se não há dados, usar mockReservations
        if (!data || data.length === 0) {
          setAllReservations(mockReservations);
          return;
        }

        // Organizar por status para o Kanban
        const organized: Record<string, any[]> = {
          new_lead: [],
          in_service: [],
          awaiting_payment: [],
          confirmed: [],
          cancelled: [],
        };

        data.forEach((reservation: any) => {
          const status = reservation.status || 'new_lead';
          if (organized[status]) {
            organized[status].push({
              id: reservation.id,
              guestName: reservation.guest_name,
              checkIn: reservation.check_in,
              checkOut: reservation.check_out,
              people: reservation.people,
              value: reservation.value || 0,
              source: reservation.source || 'google_ads',
              phone: reservation.phone,
              gclid: reservation.gclid,
            });
          }
        });

        setAllReservations(organized);
      } catch (error) {
        console.error('Erro ao carregar reservações:', error);
        setAllReservations(mockReservations);
      }
    };

    loadReservations();

    // Recarregar a cada 10 segundos
    const interval = setInterval(loadReservations, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onOpenNewReservation?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation);
  };

  const handleCloseEditModal = () => {
    setEditingReservation(undefined);
  };

  const handleSaveReservation = async (reservation: Reservation) => {
    try {
      await updateReservation(reservation.id, {
        guest_name: reservation.guestName,
        check_in: reservation.checkIn,
        check_out: reservation.checkOut,
        people: reservation.people,
        value: reservation.value,
        source: reservation.source,
      });

      // Recarregar dados
      const data = await getAllReservations();
      const organized: Record<string, any[]> = {
        new_lead: [],
        in_service: [],
        awaiting_payment: [],
        confirmed: [],
        cancelled: [],
      };

      data.forEach((res: any) => {
        const status = res.status || 'new_lead';
        if (organized[status]) {
          organized[status].push({
            id: res.id,
            guestName: res.guest_name,
            checkIn: res.check_in,
            checkOut: res.check_out,
            people: res.people,
            value: res.value || 0,
            source: res.source || 'google_ads',
            phone: res.phone,
            gclid: res.gclid,
          });
        }
      });

      setAllReservations(organized);
      handleCloseEditModal();
    } catch (error) {
      console.error('Erro ao atualizar reservação:', error);
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleOpenModal}
          className="px-4 py-1.5 rounded-lg bg-eco-500 text-white font-semibold text-sm hover:bg-eco-600 transition-smooth"
        >
          + Nova Reserva
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 min-w-full h-[calc(100vh-280px)] overflow-x-auto overflow-y-hidden">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`w-full sm:flex-1 min-w-[280px] sm:min-w-0 rounded-lg ${column.color} border ${column.borderColor} flex flex-col flex-shrink-0`}
          >
            {/* Column Header */}
            <div className="px-3 py-2 border-b border-gray-200 flex-shrink-0">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-bold text-charcoal text-xs truncate">{column.title}</h3>
                <span className="bg-white rounded-full px-2 py-0.5 text-xs font-semibold text-sage-700 flex-shrink-0">
                  {column.count}
                </span>
              </div>
            </div>

            {/* Cards Container */}
            <div className="p-3 space-y-2 overflow-hidden flex-1">
              {allReservations[column.id]?.map((reservation) => (
                <KanbanCard
                  key={reservation.id}
                  reservation={reservation}
                  onEdit={handleEditReservation}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <NewReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <EditReservationModal
        isOpen={!!editingReservation}
        reservation={editingReservation}
        onClose={handleCloseEditModal}
        onSave={handleSaveReservation}
      />
    </>
  );
}