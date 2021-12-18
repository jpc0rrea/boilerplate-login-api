import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const user1 = await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Another John Doe',
        email: user1.email,
        password: '123456',
        passwordConfirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with non-matching password confirmation', async () => {
    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
        passwordConfirmation: 'non-matching-password-confirmation',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
