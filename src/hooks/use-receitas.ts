'use client';

import { useState, useEffect } from 'react';
import type { Receita } from '@/shared/types/domain/receita';

export function useReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Carrega a lista inicial ao abrir a tela
  useEffect(() => {
    fetch('/api/receitas')
      .then((res) => res.json())
      .then((data) => setReceitas(data))
      .catch(() => setErro('Erro ao carregar receitas'));
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

      // ATUALIZAÇÃO LOCAL IMEDIATA: Adiciona o novo item ao final da lista existente
      setReceitas((estadoAnterior) => [...estadoAnterior, novaReceita]);
    } catch (err: any) {
      setErro(err.message || 'Erro inesperado');
    } finally {
      setSalvando(false);
    }
  };

  return {
    receitas,
    adicionarReceita,
    salvando,
    erro,
  };
}