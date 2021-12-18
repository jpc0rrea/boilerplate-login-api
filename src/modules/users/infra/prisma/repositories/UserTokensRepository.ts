import { UserToken } from '@prisma/client';

import prismaClient from '@shared/infra/prisma';

import IUserTokensRepository from '../../repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  public async generate(userId: string): Promise<UserToken> {
    const userToken = await prismaClient.userToken.create({
      data: {
        userId,
      },
    });

    return userToken;
  }

  public async findByToken(tokenId: string): Promise<UserToken> {
    const userToken = await prismaClient.userToken.findUnique({
      where: {
        id: tokenId,
      },
    });

    return userToken;
  }
}

export default UserTokensRepository;
