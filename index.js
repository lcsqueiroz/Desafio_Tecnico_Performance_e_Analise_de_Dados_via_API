import express from 'express';
import router from './routes/Users.js';

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
