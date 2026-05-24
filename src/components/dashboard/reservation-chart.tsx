'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', reservas: 0, ocupacao: 0 },
  { month: 'Fev', reservas: 0, ocupacao: 0 },
  { month: 'Mar', reservas: 0, ocupacao: 0 },
  { month: 'Abr', reservas: 0, ocupacao: 0 },
  { month: 'Mai', reservas: 0, ocupacao: 0 },
  { month: 'Jun', reservas: 0, ocupacao: 0 },
];

export function ReservationChart() {
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