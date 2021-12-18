import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const userPassword = '123456';
    const createdUser = await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: userPassword,
      passwordConfirmation: userPassword,
    });

    const { token, user } = await authenticateUserService.execute({
      email: createdUser.email,
      password: userPassword,
    });

    expect(token).toBeTruthy();

    expect(user).toHaveProperty('id');
  });

  it('should not be able to authenticate a user with wrong password', async () => {
    const userPassword = '123456';
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: userPassword,
      passwordConfirmation: userPassword,
    });

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with wrong email', async () => {
    const userPassword = '123456';
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: userPassword,
      passwordConfirmation: userPassword,
    });

    await expect(
      authenticateUserService.execute({
        email: 'wrong email',
        password: userPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
