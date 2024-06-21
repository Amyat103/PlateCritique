import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pictureSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 100, minLength: 3 },
    foodType: {
      type: String,
      required: true,
      enum: ['Snack', 'Breakfast', 'Brunch', 'Dinner', 'Lunch'],
    },
    description: {
      type: String,
      required: false,
      maxLength: 300,
      minLength: 5,
    },
    picture: {
      type: String,
      required: true,
    },
    rating: { type: Number, min: 0, max: 5, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Picture', pictureSchema);
