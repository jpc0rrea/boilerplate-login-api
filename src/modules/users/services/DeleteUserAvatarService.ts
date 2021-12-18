import { User } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class DeleteUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can delete avatar.');
    }

    if (!user.avatarUrl || user.avatarUrl === 'no-img.png') {
      throw new AppError('You do not have an avatar.');
    }

    await this.storageProvider.deleteFile(user.avatarUrl);

    user.avatarUrl = 'no-img.png';

    await this.usersRepository.save(user);

    return user;
  }
}

export default DeleteUserAvatarService;
