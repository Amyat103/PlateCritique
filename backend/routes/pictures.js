import express from 'express';
import {
  getPictures,
  getPicture,
  createPicture,
} from '../controllers/pictureController.js';

const router = express.Router();

// GET all pictures
router.get('/', getPictures);

// GET one picture by id
router.get('/:id', getPicture);

// POST a new picture
router.post('/', createPicture);

// DELETE a picture
router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a picture' });
});

// UPDATE a new picture
router.patch('/:id', (req, res) => {
  res.json({ message: 'UPDATE a picture' });
});

export default router;
