'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  KanbanSquare,
  Leaf,
} from 'lucide-react';

const menuItems = [
  {
    label: 'CRM Kanban',
    href: '/crm',
    icon: KanbanSquare,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-sage-200 flex flex-col h-screen shadow-soft">
      {/* Header */}
      <div className="p-6 border-b border-sage-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-eco-500 to-sage-600 flex items-center justify-center text-white">
            <Leaf size={24} />
          </div>
          <div>
            <h2 className="font-serif font-bold text-charcoal text-lg">
              Eco Lodge
            </h2>
            <p className="text-xs text-sage-600">CRM & Relatórios</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                isActive
                  ? 'bg-eco-50 text-eco-700 font-medium border-l-4 border-eco-500'
                  : 'text-charcoal hover:bg-sage-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
