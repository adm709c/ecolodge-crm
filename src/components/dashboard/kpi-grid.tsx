'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { getAllReservations } from '@/lib/supabase';

interface KPICardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  color: 'eco' | 'sage' | 'sand' | 'terracotta';
}

function KPICard({
  label,
  value,
  subtitle,
  icon,
  trend,
  color,
}: KPICardProps) {
  const colorMap = {
    eco: { bg: 'bg-eco-50', text: 'text-eco-700', icon: 'text-eco-500' },
    sage: { bg: 'bg-sage-50', text: 'text-sage-700', icon: 'text-sage-500' },
    sand: { bg: 'bg-sand-50', text: 'text-sand-700', icon: 'text-sand-500' },
    terracotta: {
      bg: 'bg-terracotta-50',
      text: 'text-terracotta-700',
      icon: 'text-terracotta-500',
    },
  };

  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} rounded-lg p-4 sm:p-6 border border-sage-200 shadow-soft`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`${colors.icon} text-2xl`}>{icon}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              trend.direction === 'up' ? 'text-eco-600' : 'text-terracotta-600'
            }`}
          >
            <TrendingUp size={14} />
            {trend.percentage}%
          </div>
        )}
      </div>
      <p className="text-sage-600 text-sm font-medium mb-1">{label}</p>
      <p className={`${colors.text} text-3xl font-bold mb-2`}>{value}</p>
      {subtitle && <p className="text-xs text-sage-500">{subtitle}</p>}
    </div>
  );
}

export function KPIGrid() {
  const [revenue, setRevenue] = useState(0);
  const [avgTicket, setAvgTicket] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllReservations();
        const confirmedReservations = data.filter((r: any) => r.status === 'confirmed');

        const totalRevenue = confirmedReservations.reduce((sum: number, r: any) => sum + (r.value || 0), 0);
        const average = confirmedReservations.length > 0 ? totalRevenue / confirmedReservations.length : 0;

        setRevenue(totalRevenue);
        setAvgTicket(average);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <KPICard
        label="Receita Mensal"
        value={`R$ ${revenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
        subtitle="Reservas Confirmadas"
        icon="💰"
        color="sand"
      />
      <KPICard
        label="Ticket Médio"
        value={`R$ ${avgTicket.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
        subtitle="Por reserva"
        icon="🎯"
        color="terracotta"
      />
    </div>
  );
}
