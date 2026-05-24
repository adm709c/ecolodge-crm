import { CRMHeader } from '@/components/crm/header';
import { KanbanBoard } from '@/components/crm/kanban';

export default function CRMPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <CRMHeader />
      <main className="flex-1 overflow-x-auto p-4 sm:p-6 md:p-8">
        <KanbanBoard />
      </main>
    </div>
  );
}