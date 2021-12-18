import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ExposedUser from '../../prisma/entities/User';

interface IUpdateUserProfileRequest extends Request {
  body: {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
    newPasswordConfirmation?: string;
  };
}

export default class UsersProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showUserProfileService = container.resolve(ShowUserProfileService);

    const user = await showUserProfileService.execute({ userId });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({ user: exposedUser });
  }

  public async update(
    request: IUpdateUserProfileRequest,
    response: Response,
  ): Promise<Response> {
    const { name, email, oldPassword, newPassword, newPasswordConfirmation } =
      request.body;

    const userId = request.user.id;

    const updateUserProfileService = container.resolve(
      UpdateUserProfileService,
    );

    const user = await updateUserProfileService.execute({
      name,
      email,
      oldPassword,
      newPassword,
      newPasswordConfirmation,
      userId,
    });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({
      user: exposedUser,
      message: 'User profile updated!',
    });
  }
}
