import ResetUserPasswordService from '@modules/users/services/ResetUserPasswordService';
import SendForgotUserPasswordEmailService from '@modules/users/services/SendForgotUserPasswordEmailService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

interface IForgotUserPasswordRequest extends Request {
  body: {
    email: string;
  };
}

interface IResetUserPasswordRequest extends Request {
  body: {
    token: string;
    password: string;
    passwordConfirmation: string;
  };
}

export default class UsersPasswordController {
  public async forgot(
    request: IForgotUserPasswordRequest,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;
    const sendForgotUserPasswordEmailService = container.resolve(
      SendForgotUserPasswordEmailService,
    );

    await sendForgotUserPasswordEmailService.execute({ email });

    return response.status(204).json();
  }

  public async reset(
    request: IResetUserPasswordRequest,
    response: Response,
  ): Promise<Response> {
    const { password, token, passwordConfirmation } = request.body;

    const resetUserPasswordService = container.resolve(
      ResetUserPasswordService,
    );

    await resetUserPasswordService.execute({
      token,
      password,
      passwordConfirmation,
    });

    return response.status(204).json();
  }
}
