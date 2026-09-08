"use client";

import { useEffect, useState } from "react";
import { getCategoriasAction } from "@/actions/categorias/get-categorias.action";
import { createCategoriaAction } from "@/actions/categorias/create-categoria.action";
import { deleteCategoriaAction } from "@/actions/categorias/delete-categoria.action";
import type { Categoria } from "@/shared/types/domain/categoria";
import type { CreateCategoriaDTO } from "@/modules/categorias/dto/create-categoria.dto";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
  const [nomeOutraCategoria, setNomeOutraCategoria] = useState<string>('');
  const [isOutraSelected, setIsOutraSelected] = useState(false);

  async function loadCategorias() {
    try {
      setCarregando(true);
      setErro(null);
      const lista = await getCategoriasAction();
      setCategorias(lista);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar categorias");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void loadCategorias();
  }, []);

  async function adicionarCategoria(dados: CreateCategoriaDTO) {
    try {
      setSalvando(true);
      setErro(null);
      const listaNova = await createCategoriaAction(categorias, dados);
      setCategorias(listaNova);
      return listaNova[listaNova.length - 1]; 
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao criar categoria");
      return null;
    } finally {
      setSalvando(false);
    }
  }

  async function removerCategoria(id: string) {
    try {
      setErro(null);
      const listaNova = await deleteCategoriaAction(categorias, id);
      setCategorias(listaNova);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao remover categoria");
    }
  }

  const handleSelectCategoria = (valor: string) => {
    setCategoriaSelecionada(valor);
    if (valor.toLowerCase() === 'cat_padrao_outra' || valor.toLowerCase() === 'outra') {
      setIsOutraSelected(true);
    } else {
      setIsOutraSelected(false);
      setNomeOutraCategoria('');
    }
  };

  const salvarCategoriaSeNecessario = async (): Promise<string> => {
    if (isOutraSelected && nomeOutraCategoria.trim()) {
      const novaCategoria = await adicionarCategoria({
        nome: nomeOutraCategoria,
        cor: "#6B7280",
        isPadrao: false,
      });
      
      if (novaCategoria) {
        return novaCategoria.id;
      }
    }
    return categoriaSelecionada;
  };

  return {
    categorias,
    carregando,
    salvando,
    erro,
    adicionarCategoria,
    removerCategoria,
    refetch: loadCategorias,
    categoriaSelecionada,
    nomeOutraCategoria,
    isOutraSelected,
    handleSelectCategoria,
    setNomeOutraCategoria,
    salvarCategoriaSeNecessario,
  };
}