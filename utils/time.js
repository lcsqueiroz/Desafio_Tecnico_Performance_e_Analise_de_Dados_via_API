export function getTimestamp() {
  return new Date().toISOString();
}

export function withTiming(fn) {
  const inicio = performance.now();
  const resultado = fn();

  return {
    resultado,
    tempo: performance.now() - inicio,
    timestamp: getTimestamp(),
  };
}
