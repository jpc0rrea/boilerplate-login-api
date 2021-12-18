import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;
let listUsersService: ListUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    listUsersService = new ListUsersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );

    expect.extend({
      toContainObject(received, argument) {
        const pass = this.equals(
          received,
          expect.arrayContaining([expect.objectContaining(argument)]),
        );

        if (pass) {
          return {
            message: () =>
              `expected ${this.utils.printReceived(
                received,
              )} not to contain object ${this.utils.printExpected(argument)}`,
            pass: true,
          };
        }
        return {
          message: () =>
            `expected ${this.utils.printReceived(
              received,
            )} to contain object ${this.utils.printExpected(argument)}`,
          pass: false,
        };
      },
    });
  });

  it('should be able to list the users', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    await createUserService.execute({
      name: 'John Doe 2',
      email: 'john2@doe.com',
      password: '123456',
      passwordConfirmation: '123456',
    });

    const users = await listUsersService.execute({
      page: 1,
      usersPerPage: 10,
    });

    expect(users).toContainObject({
      email: 'john2@doe.com',
    });
    expect(users).toContainObject({
      email: 'john@doe.com',
    });
    expect(users).not.toContainObject({
      email: 'john3@doe.com',
    });
  });
});
