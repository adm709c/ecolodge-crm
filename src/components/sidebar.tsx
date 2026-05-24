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
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-sage-200 flex md:flex-col shadow-soft">
      {/* Header */}
      <div className="p-3 md:p-6 border-b-0 md:border-b border-sage-100">
        <div className="flex items-center gap-3">
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-gradient-to-br from-eco-500 to-sage-600 flex items-center justify-center text-white flex-shrink-0">
            <Leaf size={20} className="md:w-6 md:h-6" />
          </div>
          <div className="hidden md:block">
            <h2 className="font-serif font-bold text-charcoal text-lg">
              Eco Lodge
            </h2>
            <p className="text-xs text-sage-600">CRM & Relatórios</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex md:flex-col flex-1 md:flex-1 p-2 md:p-4 space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-smooth whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-eco-50 text-eco-700 font-medium border-b-2 md:border-b-0 md:border-l-4 border-eco-500'
                  : 'text-charcoal hover:bg-sage-50'
              }`}
            >
              <Icon size={18} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
