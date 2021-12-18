import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/prisma/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/infra/repositories/IUserTokensRepository';
import '@shared/container/providers';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
