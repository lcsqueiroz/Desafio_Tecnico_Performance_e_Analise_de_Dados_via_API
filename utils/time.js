export function getTimestamp() {
  return new Date().toISOString();
}

export async function medirTempoDeExecucao(funcao) {
  const inicio = performance.now();
  const resultado = await funcao();
  const fim = performance.now();
  const tempo = fim - inicio;

  return {
    resultado,
    tempo,
    timestamp: getTimestamp(),
  };
}
