import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

interface ICreateUsersRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export default class UsersController {
  public async create(
    request: ICreateUsersRequest,
    response: Response,
  ): Promise<Response> {
    const { email, name, password, passwordConfirmation } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      name,
      password,
      passwordConfirmation,
    });

    return response.json(classToClass(user));
  }
}
