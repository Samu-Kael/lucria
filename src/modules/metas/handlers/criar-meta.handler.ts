  import type { CreateMetaDTO } from "../dto/create-meta.dto";
  import type { Meta } from "@/shared/types/domain/meta";
  import { criarMetaUseCase } from "../usecases/criar-meta.usecase";

  function capitalizarPrimeiraLetra(texto: string): string {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  export async function criarMetaHandler(dados: CreateMetaDTO): Promise<Meta> {
    const dadosNormalizados: CreateMetaDTO = {
      titulo: capitalizarPrimeiraLetra(dados.titulo.trim()),
      valorAlvo: Number(dados.valorAlvo),
      prazo: dados.prazo.trim(),
    };

    return criarMetaUseCase(dadosNormalizados);
  }