import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticatedAdmin from '../middlewares/ensureAuthenticatedAdmin';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
      permissionLevel: Joi.number().min(0),
    },
  }),
  usersController.create,
);

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      usersPerPage: Joi.number(),
    },
  }),
  ensureAuthenticatedAdmin,
  usersController.index,
);

export default usersRouter;
