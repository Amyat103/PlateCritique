import express from 'express';

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
router.post('/', (req, res) => {
  res.json({ message: 'POST a picture' });
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
