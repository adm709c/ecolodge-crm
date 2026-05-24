import { DashboardHeader } from '@/components/dashboard/header';
import { KPIGrid } from '@/components/dashboard/kpi-grid';
import { ReservationChart } from '@/components/dashboard/reservation-chart';
import { TodayCheckins } from '@/components/dashboard/today-checkins';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* KPIs */}
          <KPIGrid />

          {/* Gráficos e Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Curva de Reservas */}
            <div className="lg:col-span-2">
              <ReservationChart />
            </div>

            {/* Check-ins Hoje */}
            <div>
              <TodayCheckins />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
