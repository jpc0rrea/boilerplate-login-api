import { User } from '@prisma/client';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('E-mail already in use');
    }

    if (newPassword && !oldPassword) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      if (newPassword !== newPasswordConfirmation) {
        throw new AppError('New password does not match');
      }

      if (oldPassword === newPassword) {
        throw new AppError('New password must be different from old password');
      }

      user.password = await this.hashProvider.generateHash(newPassword);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserProfileService;
