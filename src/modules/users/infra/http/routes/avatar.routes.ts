import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import UsersAvatarController from '../controllers/UsersAvatarController';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';

const usersAvatarRouter = Router();
const upload = multer(uploadConfig.multer);

const usersAvatarController = new UsersAvatarController();

usersAvatarRouter.put(
  '/',
  ensureAuthenticatedUser,
  upload.single('avatar'),
  usersAvatarController.update,
);

usersAvatarRouter.delete(
  '/',
  ensureAuthenticatedUser,
  usersAvatarController.delete,
);

export default usersAvatarRouter;
