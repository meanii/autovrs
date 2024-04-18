import path from 'node:path';
import express from 'express';
import { Router } from 'express';
import { upload } from '../../storage/multer.js';
import { uploadController } from './upload.js';

const storageRouter = Router();

storageRouter.post(`/upload`, upload.single(`file`), uploadController)
storageRouter.use('/', express.static(path.join(process.cwd(), `filestorage`))); 


export default storageRouter;