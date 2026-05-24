'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const sourceData = [
  { name: 'Google Meu Negócio', value: 43, color: '#6b9d5f' },
  { name: 'Google Orgânico', value: 35, color: '#527c47' },
  { name: 'Google Ads', value: 22, color: '#375c31' },
];

export function SourceChart() {
  const googleTotal = sourceData
    .filter((item) => item.name.includes('Google'))
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg p-6 border border-sage-200 shadow-soft">
      <div className="mb-6">
        <h3 className="font-serif font-bold text-charcoal mb-2">
          Origem das Reservas
        </h3>
        <p className="text-sm text-sage-600 mb-4">
          Foco em rastreamento de leads vindos do Google
        </p>

        {/* Google Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-sand-50 rounded-lg p-4 border border-sand-200">
            <p className="text-xs text-sage-600 font-semibold mb-1">
              Google Meu Negócio
            </p>
            <p className="text-2xl font-bold text-sand-700">43%</p>
          </div>
          <div className="bg-terracotta-50 rounded-lg p-4 border border-terracotta-200">
            <p className="text-xs text-sage-600 font-semibold mb-1">
              Google Ads
            </p>
            <p className="text-2xl font-bold text-terracotta-700">22%</p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col justify-center space-y-3">
          {sourceData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-charcoal">
                  {item.name}
                </p>
                <p className="text-xs text-sage-600">{item.value}% das reservas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}