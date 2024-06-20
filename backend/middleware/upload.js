import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from 'dotenv';
config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      bucketName: 'images',
      filename: `${Date.now()}-img-${file.originalname}`,
    };
  },
  options: { useNewUrlParser: true, useUnifiedTopology: true },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
});

export default upload;
