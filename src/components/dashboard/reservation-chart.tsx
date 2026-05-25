'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getAllReservations } from '@/lib/supabase';

interface ChartData {
  month: string;
  reservas: number;
  ocupacao: number;
}

export function ReservationChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const reservations = await getAllReservations();
        const confirmedReservations = reservations.filter((r: any) => r.status === 'confirmed');

        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const now = new Date();
        const currentMonth = now.getMonth();

        const chartData: ChartData[] = [];
        for (let i = 11; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          const monthName = months[monthIndex];

          const count = confirmedReservations.filter((r: any) => {
            const checkInDate = new Date(r.check_in);
            return checkInDate.getMonth() === monthIndex;
          }).length;

          chartData.push({
            month: monthName,
            reservas: count,
            ocupacao: count > 0 ? Math.min((count / 5) * 100, 100) : 0,
          });
        }

        setData(chartData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setData(months.map((month) => ({ month, reservas: 0, ocupacao: 0 })));
      }
    };

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-sage-200 shadow-soft">
      <h3 className="font-serif font-bold text-charcoal mb-4">
        Curva de Reservas
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b9d5f" />
          <YAxis stroke="#6b9d5f" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f8fdf6',
              border: '1px solid #d4e5d1',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="reservas"
            stroke="#6b9d5f"
            strokeWidth={2}
            name="Reservas"
            dot={{ fill: '#6b9d5f', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
