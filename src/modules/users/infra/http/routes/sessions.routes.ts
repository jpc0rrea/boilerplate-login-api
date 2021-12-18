import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import UserSessionsController from '../controllers/UserSessionsController';

const userSessionsController = new UserSessionsController();
const userSessionsRouter = Router();

userSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userSessionsController.create,
);

export default userSessionsRouter;
