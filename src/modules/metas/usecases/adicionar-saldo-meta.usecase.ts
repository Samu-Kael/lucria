import type { AdicionarSaldoMetaDTO } from "../dto/adicionar-saldo-meta.dto";
import type { Meta } from "@/shared/types/domain/meta";
import { MetasRepository } from "../repositories/metas.repository";

export async function adicionarSaldoMetaUseCase(dados: AdicionarSaldoMetaDTO): Promise<Meta> {
  if (!dados.id) {
    throw new Error("O ID da meta é obrigatório.");
  }

  if (dados.valor <= 0) {
    throw new Error("O valor a ser adicionado deve ser maior que zero.");
  }

  const metaAtual = await MetasRepository.buscarPorId(dados.id);
  
  if (!metaAtual) {
    throw new Error("Meta não encontrada.");
  }

  return MetasRepository.adicionarSaldo(dados.id, dados.valor);
}