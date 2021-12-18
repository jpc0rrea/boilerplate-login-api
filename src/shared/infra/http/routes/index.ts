import usersAvatarRouter from '@modules/users/infra/http/routes/avatar.routes';
import usersPasswordRouter from '@modules/users/infra/http/routes/passwords.routes';
import usersProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import userSessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/users/sessions', userSessionsRouter);
routes.use('/users/password', usersPasswordRouter);
routes.use('/users/profile', usersProfileRouter);
routes.use('/users/avatar', usersAvatarRouter);

export default routes;
