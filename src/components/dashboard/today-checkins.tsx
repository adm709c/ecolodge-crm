import { LogIn, LogOut } from 'lucide-react';

const checkins = [
  { id: 1, name: 'Marina Silva', room: '203', time: '14:30' },
  { id: 2, name: 'João Santos', room: '105', time: '16:00' },
];

const checkouts = [
  { id: 1, name: 'Carlos Mendes', room: '301', time: '10:45' },
  { id: 2, name: 'Ana Pereira', room: '204', time: '11:15' },
];

export function TodayCheckins() {
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