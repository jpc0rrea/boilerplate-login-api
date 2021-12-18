import authConfig from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import UsersRepository from '../../prisma/repositories/UsersRepository';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticatedAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: userId } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    if (user.permissionLevel < authConfig.rolesToPermissionLevel.admin) {
      throw new AppError('User without the required access level', 401);
    }

    request.user = {
      id: user.id,
      permissionLevel: user.permissionLevel,
    };

    return next();
  } catch (err) {
    console.log(err);

    if (err instanceof AppError) {
      throw new AppError(err.message, err.statusCode);
    }
    throw new AppError('Invalid JWT Token', 401);
  }
}
