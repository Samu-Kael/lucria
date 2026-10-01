"use client";

import { useEffect, useState } from "react";
import { getMetasAction } from "@/actions/metas/get-metas.action";
import { createMetaAction } from "@/actions/metas/create-meta.action";
import { deleteMetaAction } from "@/actions/metas/delete-meta.action";
import { adicionarSaldoAction } from "@/actions/metas/adicionar-saldo-meta.action";
import type { Meta } from "@/shared/types/domain/meta";
import type { CreateMetaDTO } from "@/modules/metas/dto/create-meta.dto";

export function useMetas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function loadMetas() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await getMetasAction();
      setMetas(lista);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar metas");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void loadMetas();
  }, []);

  async function adicionarMeta(dados: CreateMetaDTO) {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await createMetaAction(metas, dados);
      setMetas(listaNova);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao criar meta");
    } finally {
      setSalvando(false);
    }
  }

  async function removerMeta(id: string) {
    try {
      setErro(null);
      const listaNova = await deleteMetaAction(metas, id);
      setMetas(listaNova);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao remover meta");
    }
  }

  async function adicionarSaldo(id: string, valor: number) {
    try {
      setSalvando(true);
      setErro(null);
      await adicionarSaldoAction(id, valor);
      await loadMetas(); 
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao adicionar saldo");
    } finally {
      setSalvando(false);
    }
  }

  return { 
    metas, 
    carregando, 
    salvando, 
    erro, 
    adicionarMeta, 
    removerMeta, 
    adicionarSaldo,
    refetch: loadMetas 
  };
}