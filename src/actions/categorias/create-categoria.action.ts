import type { Categoria } from "@/shared/types/domain/categoria";
import type { CreateCategoriaDTO } from "@/modules/categorias/dto/create-categoria.dto";

export async function createCategoriaAction(
  listaAtual: Categoria[],
  dados: CreateCategoriaDTO
): Promise<Categoria[]> {
  const resposta = await fetch("/api/categorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const contentType = resposta.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem ?? "Erro ao criar categoria");
    } else {
      const textoErro = await resposta.text();
      throw new Error(textoErro || "Erro interno no servidor ao criar categoria");
    }
  }

  const novaCategoria: Categoria = await resposta.json();
  return [...listaAtual, novaCategoria];
}