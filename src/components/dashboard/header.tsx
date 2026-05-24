export function DashboardHeader() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-sage-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-charcoal mb-2">Visão Geral de Hospitalidade</h1>
            <p className="text-sage-600 text-sm">
              Painel de gestão do Eco Lodge Praia de Gravatá
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-sage-600 capitalize">{today}</p>
            <p className="text-xs text-sage-500 mt-1">Última atualização: agora</p>
          </div>
        </div>
      </div>
    </header>
  );
}