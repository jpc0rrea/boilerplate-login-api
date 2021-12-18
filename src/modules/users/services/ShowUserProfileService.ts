import { User } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const cacheKey = `usersProfile:${userId}`;

    let user = await this.cacheProvider.recover<User>(cacheKey);

    if (!user) {
      user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new AppError('User not found');
      }

      await this.cacheProvider.save<User>(cacheKey, user);
    }

    return user;
  }
}

export default ShowUserProfileService;
