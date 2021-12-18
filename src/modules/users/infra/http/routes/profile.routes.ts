import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import UsersProfileController from '../controllers/UsersProfileController';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';

const usersProfileRouter = Router();
const usersProfileController = new UsersProfileController();

usersProfileRouter.use(ensureAuthenticatedUser);

usersProfileRouter.get('/', usersProfileController.show);
usersProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      // new password is only required if old password is provided
      newPassword: Joi.string().when('oldPassword', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      newPasswordConfirmation: Joi.string().valid(Joi.ref('newPassword')),
    },
  }),
  usersProfileController.update,
);

export default usersProfileRouter;
