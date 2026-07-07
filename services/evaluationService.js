export async function avaliarEndpoints(baseUrl) {
  const endpointsParaTestar = [
    '/superusers',
    '/top-countries',
    '/team-insights',
    '/active-users-per-day',
  ];

  const resultados = {};

  for (const endpoint of endpointsParaTestar) {
    const inicio = performance.now();

    try {
      const resposta = await fetch(`${baseUrl}${endpoint}`);
      const tempo = performance.now() - inicio;

      let respostaValida = true;
      try {
        await resposta.json();
      } catch (error) {
        respostaValida = false;
      }

      resultados[endpoint] = {
        status: resposta.status,
        tempoMs: Math.round(tempo),
        respostaValida,
      };
    } catch (error) {
      resultados[endpoint] = {
        status: null,
        tempoMs: Math.round(performance.now() - inicio),
        respostaValida: false,
      };
    }
  }

  return resultados;
}
