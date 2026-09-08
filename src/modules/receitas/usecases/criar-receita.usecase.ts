import type { CreateReceitaDTO } from "../dto/create-receita.dto";
import type { Receita } from "@/shared/types/domain/receita";
import { ReceitasRepository } from "../repositories/receitas.repository";

export async function criarReceitaUseCase(dados: CreateReceitaDTO): Promise<Receita> {
  if (!dados.descricao || !dados.valor || !dados.categoria || !dados.data) {
    throw new Error("Descrição, valor, categoria e data são obrigatórios.");
  }

  if (dados.descricao.length < 2) {
    throw new Error("A descrição deve ter ao menos 2 caracteres.");
  }

  if (dados.valor <= 0) {
    throw new Error("O valor da receita deve ser maior que zero.");
  }

  return ReceitasRepository.salvar(dados);
}