import { User } from ".prisma/client";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import prismaClient from "@shared/infra/prisma";

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      }
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  public async create({ email, name, password}: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password,
      }
    })

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
}

export default UsersRepository;