export function getSuperUsers(users) {
  return users.filter((user) => user.score >= 900 && user.active);
}

export function getTopCountries(users) {
  const agrupadoPorPais = Object.groupBy(
    getSuperUsers(users),
    (user) => user.country,
  );

  return Object.entries(agrupadoPorPais)
    .map(([país, superUsers]) => ({ país, total: superUsers.length }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

export function getActiveUsersPerDay(users, min) {
  const datasDosLogins = [];

  users.forEach((user) => {
    user.logs.forEach((log) => {
      if (log.action === 'login') {
        datasDosLogins.push(log.date);
      }
    });
  });

  const agrupadoPorData = Object.groupBy(datasDosLogins, (data) => data);

  let loginsPorDia = Object.entries(agrupadoPorData)
    .map(([data, logins]) => ({
      data,
      total: logins.length,
    }))
    .sort((a, b) => a.data.localeCompare(b.data));

  if (min) {
    loginsPorDia = loginsPorDia.filter((dia) => dia.total >= Number(min));
  }

  return loginsPorDia;
}

export function getTeamInsights(users) {
  const team = Object.groupBy(users, (user) => user.team.name);

  return Object.entries(team).map(([nome, membros]) => {
    const totalMembros = membros.length;
    const lideres = membros.filter((membro) => membro.team.leader).length;

    const projetosConcluidos = membros.reduce((totalProjetos, membro) => {
      const concluidosDoMembro = membro.team.projects.filter(
        (projeto) => projeto.completed,
      ).length;
      return totalProjetos + concluidosDoMembro;
    }, 0);

    const ativos = membros.filter((membro) => membro.active).length;
    const percentualAtivos = ((ativos / totalMembros) * 100).toFixed(2);

    return {
      time: nome,
      totalMembros,
      lideres,
      projetosConcluidos,
      percentualAtivos,
    };
  });
}
