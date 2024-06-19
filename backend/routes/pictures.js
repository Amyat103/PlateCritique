import express from 'express';
import {
  getPictures,
  getPicture,
  createPicture,
  deletePicture,
  updatePicture,
} from '../controllers/pictureController.js';

const router = express.Router();

// GET all pictures
router.get('/', getPictures);

// GET one picture by id
router.get('/:id', getPicture);

// POST a new picture
router.post('/', createPicture);

// DELETE a picture
router.delete('/:id', deletePicture);

// UPDATE a new picture
router.patch('/:id', updatePicture);

export default router;
