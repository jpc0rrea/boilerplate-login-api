import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@prisma/client';

import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  public async findMany(page: number, usersPerPage: number): Promise<User[]> {
    const start = (page - 1) * usersPerPage;

    const foundUsers = this.users.slice(start, start + usersPerPage);

    return foundUsers;
  }

  public async create({
    email,
    name,
    password,
    permissionLevel,
  }: ICreateUserDTO): Promise<User> {
    const user = {} as User;

    Object.assign(user, {
      id: 'id',
      email,
      name,
      password,
      permissionLevel: permissionLevel || 1,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  public async updateLastLogin(userId: string): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === userId,
    );

    const user = this.users[findIndex];

    const updatedUser = Object.assign(user, {
      lastLogin: new Date(),
    });

    this.users[findIndex] = updatedUser;

    return updatedUser;
  }
}

export default FakeUsersRepository;
