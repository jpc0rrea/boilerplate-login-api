import DeleteUserAvatarService from '@modules/users/services/DeleteUserAvatarService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ExposedUser from '../../prisma/entities/User';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const avatarFilename = request.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      userId,
      avatarFilename,
    });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({ user: exposedUser });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const deleteUserAvatarService = container.resolve(DeleteUserAvatarService);

    const user = await deleteUserAvatarService.execute({
      userId,
    });

    const exposedUser = plainToInstance(ExposedUser, user);

    return response.json({ user: exposedUser });
  }
}
