import express from 'express';
import { config } from 'dotenv';
import pictureRoutes from './routes/pictures.js';

config();

const PORT = process.env.PORT;

const app = express();

// add body to req to modify database
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// attach routes
app.use('/', pictureRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
