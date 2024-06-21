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
  console.log(req.body);
  console.log(req.file);

  const { title, foodType, description, rating } = req.body;
  const picture = req.file ? req.file.filename : null;

  try {
    const newPicture = await Picture.create({
      title,
      foodType,
      description,
      picture,
      rating,
    });
    res.status(200).json(newPicture);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

// DELETE a picture

async function deletePicture(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Can't find that picture, couldn't delete" });
  }

  const picture = await Picture.findByIdAndDelete({ _id: id });

  if (!picture) {
    return res.status(400).json({ error: 'No such picture' });
  }

  res.status(200).json(picture);
}

// UPDATE a picture

async function updatePicture(req, res) {
  const { id } = req.params;
  const { title, foodType, description, rating } = req.body;
  const picture = req.file ? req.file.filename : null;

  try {
    const updatedPicture = await Picture.findByIdAndUpdate(
      id,
      {
        title,
        foodType,
        description,
        picture,
        rating,
      },
      { new: true }
    );
    res.status(200).json(updatedPicture);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

export { createPicture, getPictures, getPicture, deletePicture, updatePicture };
