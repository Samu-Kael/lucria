'use client';

import { useReceitas } from '@/hooks/use-receitas';
import { FormReceita } from '@/components/receitas/form-receita';

export default function ReceitasPage() {
  const { receitas, carregando, removerReceita } = useReceitas();

  return (
    <main className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Gestão de Receitas</h1>
        <p className="text-zinc-400 text-sm">Registre suas fontes de renda e entradas financeiras.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FormReceita />
        </div>

        <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-lg border border-zinc-800 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Minhas Receitas</h2>

          {carregando ? (
            <p className="text-zinc-400 text-sm">Carregando receitas...</p>
          ) : receitas.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nenhuma receita cadastrada ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="text-xs uppercase bg-zinc-800/60 text-zinc-400 border-b border-zinc-700">
                  <tr>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {receitas.map((item: any) => (
                    <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 font-medium text-white">{item.descricao}</td>
                      <td className="py-3 px-4">
                        <span className="bg-zinc-800 px-2 py-1 rounded text-xs text-emerald-400 border border-zinc-700">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        + R$ {Number(item.valor).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => removerReceita(item.id)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded text-xs transition-colors"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}