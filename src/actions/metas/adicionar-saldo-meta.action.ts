'use server';

import { adicionarSaldoMetaHandler } from "@/modules/metas/handlers/adicionar-saldo-meta.handler";

export async function adicionarSaldoAction(id: string, valor: number) {
  try {
    await adicionarSaldoMetaHandler({ id, valor });
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || "Erro ao adicionar saldo");
  }
}