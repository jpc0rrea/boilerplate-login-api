import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import UsersPasswordController from '../controllers/UsersPasswordController';

const usersPasswordRouter = Router();
const usersPasswordController = new UsersPasswordController();

usersPasswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  usersPasswordController.forgot,
);

usersPasswordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersPasswordController.reset,
);

export default usersPasswordRouter;
