'use client';

import { useState, useEffect } from 'react';
import type { Receita } from '@/shared/types/domain/receita';

export function useReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarReceitas() {
    try {
      setCarregando(true);
      setErro(null);
      const res = await fetch('/api/receitas');
      if (!res.ok) throw new Error('Erro ao carregar receitas');
      const data = await res.json();
      setReceitas(data);
    } catch (err: any) {
      setErro(err.message || 'Erro ao carregar receitas');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarReceitas();
  }, []);

  const adicionarReceita = async (dados: Omit<Receita, 'id' | 'criadoEm'>) => {
    setSalvando(true);
    setErro(null);

    try {
      const resposta = await fetch('/api/receitas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error('Erro ao salvar receita');

      const novaReceita: Receita = await resposta.json();
      setReceitas((estadoAnterior) => [...estadoAnterior, novaReceita]);
    } catch (err: any) {
      setErro(err.message || 'Erro inesperado');
    } finally {
      setSalvando(false);
    }
  };

  const removerReceita = async (id: string) => {
    try {
      setErro(null);
      const resposta = await fetch(`/api/receitas/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) throw new Error('Erro ao remover receita');

      setReceitas((estadoAnterior) => estadoAnterior.filter((item) => item.id !== id));
    } catch (err: any) {
      setErro(err.message || 'Erro ao remover receita');
    }
  };

  return {
    receitas,
    carregando,
    salvando,
    erro,
    adicionarReceita,
    removerReceita,
    refetch: carregarReceitas,
  };
}