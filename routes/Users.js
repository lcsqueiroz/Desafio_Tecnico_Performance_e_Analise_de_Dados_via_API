import { Router } from 'express';

const router = Router();
const users = [];

router.get('/users', (req, res) => {
  res.status(200).json(users);
});

router.post('/users', (req, res) => {
  const userData = req.body;

  if (!userData) {
    res.status(400).json({ message: 'Sem informações' });
  }

  users.push(userData);

  return res.status(200).json({ message: 'Usuário enviado com sucesso' });
});

export default router;
