'use client';

import { useMetas } from '@/hooks/use-metas';
import { FormMeta } from '@/components/metas/form-meta';

export default function MetasPage() {
  const { metas, carregando, removerMeta, adicionarSaldo } = useMetas();

  return (
    <main className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Minhas Metas Financeiras</h1>
        <p className="text-zinc-400 text-sm">Defina objetivos e acompanhe seu progresso acumulado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FormMeta />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white">Progresso dos Objetivos</h2>

          {carregando ? (
            <p className="text-zinc-400 text-sm">Carregando metas...</p>
          ) : metas.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nenhuma meta cadastrada ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metas.map((meta: any) => {
                const acumulado = Number(meta.acumulado || 0);
                const objetivo = Number(meta.valorAlvo || meta.valorObjetivo || 0);
                const porcentagem = objetivo > 0 ? Math.min(100, Math.round((acumulado / objetivo) * 100)) : 0;

                return (
                  <div key={meta.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">{meta.titulo}</h3>
                        <p className="text-sm text-zinc-400">
                          Prazo: {meta.prazo ? new Date(meta.prazo).toLocaleDateString('pt-BR') : 'Sem prazo'}
                        </p>
                      </div>
                      <button 
                        onClick={() => removerMeta(meta.id)} 
                        className="text-red-400 text-xs hover:underline"
                      >
                        Excluir
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-zinc-300">
                        <span>Progresso</span>
                        <span className="text-blue-400 font-bold">{porcentagem}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${porcentagem}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">
                        Acumulado: <strong className="text-emerald-400">R$ {acumulado.toFixed(2)}</strong>
                      </span>
                      <span className="text-zinc-400">
                        Meta: <strong className="text-white">R$ {objetivo.toFixed(2)}</strong>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        const resposta = window.prompt(`Quanto você deseja adicionar para o objetivo "${meta.titulo}"?\n(Use ponto para centavos. Ex: 150.50)`);
                        if (resposta) {
                          const valorParaAdicionar = parseFloat(resposta.replace(',', '.'));
                          if (!isNaN(valorParaAdicionar) && valorParaAdicionar > 0) {
                            adicionarSaldo(meta.id, valorParaAdicionar);
                          } else {
                            alert('Por favor, digite um valor válido maior que zero.');
                          }
                        }
                      }}
                      className="w-full mt-2 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-bold rounded-md transition-colors text-sm border border-blue-500/30"
                    >
                      + Adicionar Valor
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}