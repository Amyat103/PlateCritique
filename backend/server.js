import express from 'express';
import { config } from 'dotenv';
import pictureRoutes from './routes/pictures.js';
import mongoose from 'mongoose';
import cors from 'cors';

config();

const PORT = process.env.PORT;

const app = express();

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(
  cors({
    origin: 'platecritique.up.railway.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// add body to req to modify database
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// attach routes
app.use('/', pictureRoutes);

// connect mongoDB atlas
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MONGO');
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

connectToMongo();
