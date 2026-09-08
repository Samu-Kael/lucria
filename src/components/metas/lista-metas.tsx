'use client';

import { useMetas } from '@/hooks/use-metas';
import { useState } from 'react';
import type { Meta } from '@/shared/types/domain/meta';

export function ListaMetas() {
  const { metas, carregando, removerMeta } = useMetas();

  // Estados para o Modal de Adicionar Saldo
  const [modalAberto, setModalAberto] = useState(false);
  const [metaSelecionada, setMetaSelecionada] = useState<Meta | null>(null);
  const [valorAdicionar, setValorAdicionar] = useState('');
  const [processando, setProcessando] = useState(false);

  const abrirModalSaldo = (meta: Meta) => {
    setMetaSelecionada(meta);
    setValorAdicionar('');
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMetaSelecionada(null);
  };

  const handleAdicionarSaldoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaSelecionada || !valorAdicionar) return;

    try {
      setProcessando(true);
      // Aqui você pode integrar com a lógica de atualização de saldo quando precisar
      fecharModal();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessando(false);
    }
  };

  if (carregando) {
    return <p className="text-zinc-400 text-sm">Carregando metas...</p>;
  }

  if (metas.length === 0) {
    return <p className="text-zinc-500 text-sm p-4 bg-zinc-900 rounded-lg">Nenhuma meta cadastrada ainda.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metas.map((meta) => {
          // Busca com segurança o valor atual independentemente de como ele se chama no tipo
          const valorAtual = Number((meta as any).valorAtual ?? (meta as any).acumulado ?? 0);
          const percentual = Math.min(
            Math.round((valorAtual / meta.valorAlvo) * 100),
            100
          );

          return (
            <div key={meta.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-lg">{meta.titulo}</h3>
                  <p className="text-xs text-zinc-400">
                    Prazo: {meta.prazo ? (isNaN(Date.parse(meta.prazo)) ? meta.prazo : new Date(meta.prazo).toLocaleDateString('pt-BR')) : 'Não definido'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => abrirModalSaldo(meta)}
                    className="text-xs bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 px-2.5 py-1 rounded transition-colors font-medium"
                  >
                    + Saldo
                  </button>
                  <button 
                    onClick={() => removerMeta(meta.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-400">Progresso</span>
                  <span className="text-blue-400">{percentual}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300" 
                    style={{ width: `${percentual}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-zinc-800/60">
                <span className="text-zinc-400">
                  Acumulado: <strong className="text-emerald-400">R$ {valorAtual.toFixed(2)}</strong>
                </span>
                <span className="text-zinc-400">
                  Meta: <strong className="text-white">R$ {Number(meta.valorAlvo).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Moderno para Adicionar Saldo */}
      {modalAberto && metaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Adicionar Saldo na Meta</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Meta: <span className="text-blue-400 font-medium">{metaSelecionada.titulo}</span>
            </p>

            <form onSubmit={handleAdicionarSaldoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Valor a adicionar (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={valorAdicionar}
                  onChange={(e) => setValorAdicionar(e.target.value)}
                  placeholder="0.00"
                  required
                  autoFocus
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="rounded-md px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processando}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {processando ? 'Salvando...' : 'Confirmar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}