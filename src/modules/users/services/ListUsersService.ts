import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface IListUserRequest {
  page: number;
  usersPerPage: number;
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    page,
    usersPerPage,
  }: IListUserRequest): Promise<User[]> {
    const cacheKey = `users:${page}:${usersPerPage}`;
    let users = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!users || users.length === 0) {
      users = await this.usersRepository.findMany(page, usersPerPage);

      await this.cacheProvider.save<User[]>(cacheKey, users);
    }

    return users;
  }
}

export default ListUsersService;
