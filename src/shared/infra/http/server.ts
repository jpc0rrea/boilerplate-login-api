import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/prisma';
import '@shared/container';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN.split(', '),
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body'); // 'details' is a Map()
    const {
      details: [errorDetails],
    } = errorBody;

    return response.status(500).json({
      status: 'error',
      success: false,
      message: errorDetails.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    success: false,
    message: 'Internal Server Error',
  });
});

app.listen(process.env.ENVIRONMENT === 'dev' ? 3333 : 8080, () => {
  return console.log(
    `🚀 Server started on port ${
      process.env.ENVIRONMENT === 'dev' ? 3333 : 8080
    }!`,
  );
});
