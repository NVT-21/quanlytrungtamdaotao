// upload.middleware.ts
import * as multer from 'multer';
import * as path from 'path';


export const StorageFunc= () =>multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:/develop web/NestJs/login-1/photo');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
})
 

