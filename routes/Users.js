import { Router } from 'express';
import fs from 'fs';

const router = Router();
const users = [];

router.get('/users', (req, res) => {
  return res.status(200).json(users);
});

router.post('/users', (req, res) => {
  fs.readFile('usuarios_1000.json', 'utf-8', (err, snapshot) => {
    if (err) res.status(400).json({ message: 'Sem Informações' });
    const userData = JSON.parse(snapshot);
    users.push(...userData);
    return res.status(200).json({ message: 'Usuários enviados com sucesso' });
  });
});

router.get('/superusers', (req, res) => {
  const superUsers = users
    .filter((users) => {
      return users.score >= 900 && users.active;
    })
    .map((users) => ({
      id: users.id,
      name: users.name,
      idade: users.age,
      score: users.score,
      país: users.country,
    }));
  return res.status(200).json(superUsers);
});
export default router;
