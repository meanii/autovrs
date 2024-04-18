import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), 'filestorage'));
    },

    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
    
});

const upload = multer({ storage: storage });

export { upload }