import type { Receita } from "@/shared/types/domain/receita";
import type { CreateReceitaDTO } from "@/modules/receitas/dto/create-receita.dto";

export async function createReceitaAction(
  listaAtual: Receita[],
  dados: CreateReceitaDTO
): Promise<Receita[]> {
  const resposta = await fetch("/api/receitas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const contentType = resposta.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem ?? "Erro ao criar receita");
    } else {
      const textoErro = await resposta.text();
      throw new Error(textoErro || "Erro interno no servidor ao criar receita");
    }
  }

  const novaReceita: Receita = await resposta.json();
  return [...listaAtual, novaReceita];
}