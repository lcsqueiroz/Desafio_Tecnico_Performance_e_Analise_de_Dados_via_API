import { Router } from 'express';
import fs from 'fs';
import { getSuperUsers, getTimestamp } from '../utils/users.js';

const router = Router();
const users = [];

router.get('/users', (req, res) => {
  return res.status(200).json(users);
});

router.post('/users', (req, res) => {
  fs.readFile('usuarios_1000.json', 'utf-8', (err, snapshot) => {
    if (err) return res.status(400).json({ message: 'Sem Informações' });
    const userData = JSON.parse(snapshot);
    users.push(...userData);

    const totalItens = userData.length;

    return res.status(200).json({
      message: 'Usuários enviados com sucesso',
      userCount: totalItens,
    });
  });
});

router.get('/superusers', (req, res) => {
  const inicio = performance.now();
  const superUsers = getSuperUsers(users).map((user) => ({
    id: user.id,
    name: user.name,
    idade: user.age,
    score: user.score,
    país: user.country,
  }));
  return res.status(200).json({
    superUsers,
    tempo: performance.now() - inicio,
    timestamp: getTimestamp(),
  });
});

router.get('/top-countries', (req, res) => {
  try {
    const inicio = performance.now();

    const agrupadoPorPais = Object.groupBy(
      getSuperUsers(users),
      (user) => user.country,
    );

    const topPaises = Object.entries(agrupadoPorPais)
      .map(([país, superUsers]) => ({ país, total: superUsers.length }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return res.status(200).json({
      topPaises,
      tempo: performance.now() - inicio,
      timestamp: getTimestamp(),
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});
export default router;
