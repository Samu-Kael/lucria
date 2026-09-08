import type { Despesa } from "@/shared/types/domain/despesa";
import type { CreateDespesaDTO } from "@/modules/despesas/dto/create-despesa.dto";

export async function createDespesaAction(
  listaAtual: Despesa[],
  dados: CreateDespesaDTO
): Promise<Despesa[]> {
  const resposta = await fetch("/api/despesas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const contentType = resposta.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem ?? "Erro ao criar despesa");
    } else {
      const textoErro = await resposta.text();
      throw new Error(textoErro || "Erro interno no servidor ao criar despesa");
    }
  }

  const novaDespesa: Despesa = await resposta.json();
  return [...listaAtual, novaDespesa];
}