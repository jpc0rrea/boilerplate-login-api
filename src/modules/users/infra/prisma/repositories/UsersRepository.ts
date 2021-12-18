import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import { User } from '@prisma/client';

import prismaClient from '@shared/infra/prisma';

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async findMany(page: number, usersPerPage: number): Promise<User[]> {
    const users = await prismaClient.user.findMany({
      skip: (page - 1) * usersPerPage,
      take: usersPerPage,
    });

    return users;
  }

  public async create({
    email,
    name,
    password,
    permissionLevel,
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password,
        permissionLevel: permissionLevel || 1,
      },
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return updatedUser;
  }

  public async updateLastLogin(userId: string): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    return updatedUser;
  }
}

export default UsersRepository;
