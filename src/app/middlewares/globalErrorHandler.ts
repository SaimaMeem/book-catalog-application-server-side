/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import APIError from '../../errors/APIError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleCastError from '../../errors/handleCastError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];
  config.env === 'development'
    ? console.log('global handler')
    : console.error('global handler');
  if (error?.name === 'ValidationError') {
    const simplifliedError = handleValidationError(error);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorMessages = simplifliedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifliedError = handleZodError(error);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorMessages = simplifliedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifliedError = handleCastError(error);
    statusCode = simplifliedError.statusCode;
    message = simplifliedError.message;
    errorMessages = simplifliedError.errorMessages;
  } else if (error instanceof APIError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
