import { Router } from 'express';
import { readFile } from 'fs/promises';
import { getAllUsers, addUsers } from '../store/usersStore.js';
import {
  getSuperUsers,
  getTopCountries,
  getTeamInsights,
} from '../services/usersService.js';
import { medirTempoDeExecucao } from '../utils/time.js';

const router = Router();

router.get('/users', (req, res) => {
  return res.status(200).json(getAllUsers());
});

router.post('/users', async (req, res) => {
  try {
    const snapshot = await readFile('data/usuarios_1000.json', 'utf-8');
    const userData = JSON.parse(snapshot);
    addUsers(userData);

    return res.status(200).json({
      message: 'Usuários enviados com sucesso',
      userCount: userData.length,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Sem Informações' });
  }
});

router.get('/superusers', (req, res) => {
  const { resultado, tempo, timestamp } = medirTempoDeExecucao(() =>
    getSuperUsers(getAllUsers()).map((user) => ({
      id: user.id,
      name: user.name,
      idade: user.age,
      score: user.score,
      país: user.country,
    })),
  );

  return res.status(200).json({ superUsers: resultado, tempo, timestamp });
});

router.get('/top-countries', (req, res) => {
  try {
    const { resultado, tempo, timestamp } = medirTempoDeExecucao(() =>
      getTopCountries(getAllUsers()),
    );

    return res.status(200).json({ topPaises: resultado, tempo, timestamp });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.get('/team-insights', (req, res) => {
  const { resultado, tempo, timestamp } = medirTempoDeExecucao(() =>
    getTeamInsights(getAllUsers()),
  );

  return res.status(200).json({ teamInsights: resultado, tempo, timestamp });
});

export default router;
