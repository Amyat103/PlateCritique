import express from 'express';
import {
  getPictures,
  getPicture,
  createPicture,
  deletePicture,
  updatePicture,
} from '../controllers/pictureController.js';
import upload from '../middleware/upload.js';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

const router = express.Router();

router.use((req, res, next) => {
  if (!req.app.locals.gridFSBucket) {
    req.app.locals.gridFSBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'images',
    });
  }
  next();
});

// GET ALL PIC????? TEST
router.get('/', getPictures);

// GET all pictures
router.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const downloadStream =
    req.app.locals.gridFSBucket.openDownloadStreamByName(filename);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    res.end();
  });
});

// GET one picture by id
router.get('/:id', getPicture);

// POST a new picture with file upload
router.post('/', upload.single('picture'), createPicture);

// UPDATE a picture with new file upload
router.patch('/:id', upload.single('picture'), updatePicture);

// DELETE a picture
router.delete('/:id', deletePicture);

export default router;
