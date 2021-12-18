import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import { plainToInstance } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ExposedUser from '../../prisma/entities/User';

interface ICreateUsersRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    permissionLevel?: number;
  };
}

interface IListUsersRequest extends Request {
  query: {
    page: string;
    usersPerPage: string;
  };
}

export default class UsersController {
  public async create(
    request: ICreateUsersRequest,
    response: Response,
  ): Promise<Response> {
    const { email, name, password, passwordConfirmation, permissionLevel } =
      request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      password,
      passwordConfirmation,
      permissionLevel,
    });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({ user: exposedUser });
  }

  public async index(
    request: IListUsersRequest,
    response: Response,
  ): Promise<Response> {
    const { page = '1', usersPerPage = '10' } = request.query;

    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute({
      page: Number(page),
      usersPerPage: Number(usersPerPage),
    });

    const exposedUsers = plainToInstance(ExposedUser, users);

    return response.json({ users: exposedUsers });
  }
}
