import express from 'express';
import Picture from '../models/PictureModel.js';

const router = express.Router();

// GET all pictures
router.get('/', (req, res) => {
  res.json({ message: 'GET all pictures' });
});

// GET one picture by id
router.get('/:id', (req, res) => {
  res.json({ message: 'GET one picture' });
});

// POST a new picture
router.post('/', async (req, res) => {
  const { title, foodType, description, picture, timestamp } = req.body;

  try {
    const newPicture = await Picture.create({
      title,
      foodType,
      description,
      picture,
      timestamp,
    });
    res.status(200).json(newPicture);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a picture
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a picture' });
});

// UPDATE a new picture
router.patch('/:id', (req, res) => {
  res.json({ message: 'UPDATE a picture' });
});

export default router;
