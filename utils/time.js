export function getTimestamp() {
  return new Date().toISOString();
}

export function medirTempoDeExecucao(funcao) {
  const inicio = performance.now();
  const resultado = funcao();
  const fim = performance.now();
  const tempo = fim - inicio;

  return {
    resultado,
    tempo,
    timestamp: getTimestamp(),
  };
}
