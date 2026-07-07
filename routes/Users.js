import { Router } from 'express';
import { readFile } from 'fs/promises';
import { getAllUsers, addUsers } from '../store/usersStore.js';
import {
  getSuperUsers,
  getTopCountries,
  getTeamInsights,
  getActiveUsersPerDay,
} from '../services/usersService.js';
import { avaliarEndpoints } from '../services/evaluationService.js';
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

router.get('/superusers', async (req, res) => {
  const { resultado, tempo, timestamp } = await medirTempoDeExecucao(() =>
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

router.get('/top-countries', async (req, res) => {
  try {
    const { resultado, tempo, timestamp } = await medirTempoDeExecucao(() =>
      getTopCountries(getAllUsers()),
    );

    return res.status(200).json({ topPaises: resultado, tempo, timestamp });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
});

router.get('/team-insights', async (req, res) => {
  const { resultado, tempo, timestamp } = await medirTempoDeExecucao(() =>
    getTeamInsights(getAllUsers()),
  );

  return res.status(200).json({ teamInsights: resultado, tempo, timestamp });
});

router.get('/active-users-per-day', async (req, res) => {
  const { min } = req.query;

  const { resultado, tempo, timestamp } = await medirTempoDeExecucao(() =>
    getActiveUsersPerDay(getAllUsers(), min),
  );

  return res.status(200).json({ loginsPorDia: resultado, tempo, timestamp });
});

router.get('/evaluation', async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  const { resultado, tempo, timestamp } = await medirTempoDeExecucao(() =>
    avaliarEndpoints(baseUrl),
  );

  return res
    .status(200)
    .json({ endpointsTestados: resultado, tempo, timestamp });
});

export default router;
