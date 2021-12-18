import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@prisma/client';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findMany(page: number, perPage: number): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  updateLastLogin(userId: string): Promise<User>;
}
