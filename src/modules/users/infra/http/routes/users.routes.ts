import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';

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
    },
  }),
  usersController.create,
);

export default usersRouter;
