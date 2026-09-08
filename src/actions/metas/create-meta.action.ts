import type { Meta } from "@/shared/types/domain/meta";
import type { CreateMetaDTO } from "@/modules/metas/dto/create-meta.dto";

export async function createMetaAction(
  listaAtual: Meta[],
  dados: CreateMetaDTO
): Promise<Meta[]> {
  const resposta = await fetch("/api/metas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    const contentType = resposta.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem ?? "Erro ao criar meta");
    } else {
      const textoErro = await resposta.text();
      throw new Error(textoErro || "Erro interno no servidor ao criar meta");
    }
  }

  const novaMeta: Meta = await resposta.json();
  return [...listaAtual, novaMeta];
}