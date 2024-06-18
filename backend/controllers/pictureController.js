import Picture from '../models/PictureModel.js';
import mongoose from 'mongoose';

// GET all pictures
async function getPictures(req, res) {
  const foundPictures = await Picture.find({}).sort({ createdAt: -1 });

  res.status(200).json(foundPictures);
}

// GET one picture
async function getPicture(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find that picture" });
  }

  const foundPicture = await Picture.findById(id);

  if (!foundPicture) {
    return res.status(404).json({ error: "Can't Find Picture" });
  }

  res.status(200).json(foundPicture);
}

// CREATE new picture
async function createPicture(req, res) {
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
}

// DELETE a picture

// UPDATE a picture

export { createPicture, getPictures, getPicture };
