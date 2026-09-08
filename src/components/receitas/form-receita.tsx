'use client';

import { useReceitas } from '@/hooks/use-receitas';
import { useCategorias } from '@/hooks/use-categorias';
import { SelectCategoriaDinamico } from '../categorias/select-categoria-dinamico';
import { useState } from 'react';

export function FormReceita() {
  const { adicionarReceita, salvando, erro } = useReceitas();
  const { salvarCategoriaSeNecessario } = useCategorias();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    
    const nomeCategoriaFinal = await salvarCategoriaSeNecessario();
    
    const selectElement = form.elements.namedItem('categoria') as HTMLSelectElement;
    const categoriaSelecionada = nomeCategoriaFinal || selectElement?.value;

    if (!categoriaSelecionada) return;

    const novaReceita = {
      descricao,
      valor: Number(valor),
      data, 
      categoria: categoriaSelecionada, 
    };

    await adicionarReceita(novaReceita);

    setDescricao('');
    setValor('');
    setData('');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-emerald-400">Nova Receita</h2>

      {erro && (
        <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
          {erro}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="descricao" className="text-sm font-medium text-zinc-300">Descrição</label>
        <input 
          type="text" 
          name="descricao" 
          id="descricao" 
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required 
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white focus:ring-2 focus:ring-emerald-500" 
          placeholder="Ex: Salário Mensal, Freelance" 
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="valor" className="text-sm font-medium text-zinc-300">Valor (R$)</label>
        <input 
          type="number" 
          step="0.01" 
          name="valor" 
          id="valor" 
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required 
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white focus:ring-2 focus:ring-emerald-500" 
          placeholder="0.00" 
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="data" className="text-sm font-medium text-zinc-300">Data de Recebimento</label>
        <input 
          type="date" 
          name="data" 
          id="data" 
          value={data}
          onChange={(e) => setData(e.target.value)}
          required 
          className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white focus:ring-2 focus:ring-emerald-500" 
        />
      </div>

      <SelectCategoriaDinamico />

      <button 
        type="submit" 
        disabled={salvando} 
        className="w-full rounded-md bg-emerald-600 px-4 py-2 font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
      >
        {salvando ? 'Cadastrando...' : 'Cadastrar Receita'}
      </button>
    </form>
  );
}