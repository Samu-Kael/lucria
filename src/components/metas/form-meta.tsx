'use client';

import { useMetas } from '@/hooks/use-metas';

export function FormMeta() {
  const { adicionarMeta, salvando, erro } = useMetas();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const valorDigitado = formData.get('valorObjetivo') || formData.get('valorAlvo') || formData.get('valor');

    const novaMeta = {
      titulo: formData.get('titulo') as string,
      valorAlvo: Number(valorDigitado), // Mapeado corretamente para o DTO/Banco
      prazo: formData.get('prazo') as string,
      acumulado: 0,
    };

    await adicionarMeta(novaMeta);
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Nova Meta</h2>

      {erro && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm">
          {erro}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="titulo" className="text-sm font-medium text-zinc-300">Título do Objetivo</label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          required
          className="w-full p-2 rounded-md border border-zinc-700 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ex: Viagem de Fim de Ano, Reserva de Emergência"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="valorObjetivo" className="text-sm font-medium text-zinc-300">Valor Objetivado (R$)</label>
        <input
          type="number"
          step="0.01"
          name="valorObjetivo"
          id="valorObjetivo"
          required
          className="w-full p-2 rounded-md border border-zinc-700 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="5000.00"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="prazo" className="text-sm font-medium text-zinc-300">Prazo Estimado</label>
        <input
          type="date"
          name="prazo"
          id="prazo"
          required
          className="w-full p-2 rounded-md border border-zinc-700 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors disabled:opacity-50"
      >
        {salvando ? 'Salvando...' : 'Criar Meta'}
      </button>
    </form>
  );
}