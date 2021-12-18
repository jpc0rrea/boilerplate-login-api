import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';
import IUserTokensRepository from '../infra/repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class ResetUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    token,
    password,
    passwordConfirmation,
  }: IRequest): Promise<void> {
    if (password !== passwordConfirmation) {
      throw new AppError('Passwords do not match');
    }

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2); // token has 2 valid hours

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}

export default ResetUserPasswordService;
