'use client';

import { useEffect, useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { getAllReservations } from '@/lib/supabase';

interface Guest {
  id: string;
  name: string;
  room: string;
  time: string;
}

export function TodayCheckins() {
  const [checkins, setCheckins] = useState<Guest[]>([]);
  const [checkouts, setCheckouts] = useState<Guest[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const reservations = await getAllReservations();
        const today = new Date().toISOString().split('T')[0];

        const todayCheckins = reservations
          .filter((r: any) => r.status === 'confirmed' && r.check_in === today)
          .map((r: any, index: number) => ({
            id: r.id,
            name: r.guest_name,
            room: String((index % 5) + 1),
            time: '14:00',
          }));

        const todayCheckouts = reservations
          .filter((r: any) => r.status === 'confirmed' && r.check_out === today)
          .map((r: any, index: number) => ({
            id: r.id,
            name: r.guest_name,
            room: String((index % 5) + 1),
            time: '11:00',
          }));

        setCheckins(todayCheckins);
        setCheckouts(todayCheckouts);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Check-ins */}
      <div className="bg-white rounded-lg p-4 sm:p-6 border border-sage-200 shadow-soft">
        <h3 className="font-serif font-bold text-charcoal mb-4 flex items-center gap-2">
          <LogIn size={20} className="text-eco-500" />
          Check-ins de Hoje
        </h3>
        <div className="space-y-3">
          {checkins.length > 0 ? (
            checkins.map((guest) => (
              <div
                key={guest.id}
                className="flex justify-between items-center p-3 bg-eco-50 rounded-lg border border-eco-200"
              >
                <div>
                  <p className="font-medium text-charcoal text-sm">
                    {guest.name}
                  </p>
                  <p className="text-xs text-sage-600">Suite {guest.room}</p>
                </div>
                <p className="text-sm font-semibold text-eco-700">
                  {guest.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-sage-600 text-center py-4">
              Nenhum check-in
            </p>
          )}
        </div>
      </div>

      {/* Check-outs */}
      <div className="bg-white rounded-lg p-4 sm:p-6 border border-sage-200 shadow-soft">
        <h3 className="font-serif font-bold text-charcoal mb-4 flex items-center gap-2">
          <LogOut size={20} className="text-terracotta-500" />
          Check-outs de Hoje
        </h3>
        <div className="space-y-3">
          {checkouts.length > 0 ? (
            checkouts.map((guest) => (
              <div
                key={guest.id}
                className="flex justify-between items-center p-3 bg-terracotta-50 rounded-lg border border-terracotta-200"
              >
                <div>
                  <p className="font-medium text-charcoal text-sm">
                    {guest.name}
                  </p>
                  <p className="text-xs text-sage-600">Suite {guest.room}</p>
                </div>
                <p className="text-sm font-semibold text-terracotta-700">
                  {guest.time}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-sage-600 text-center py-4">
              Nenhum check-out
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
