import { UserToken } from '@prisma/client';

export default interface IUserTokensRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
}
