import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { plainToInstance } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ExposedUser from '../../prisma/entities/User';

interface ICreateUserSessionRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default class UserSessionsController {
  public async create(
    request: ICreateUserSessionRequest,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({ user: exposedUser, token });
  }
}
