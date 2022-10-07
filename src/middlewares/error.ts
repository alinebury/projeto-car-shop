import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const errorHandler = async ( 
  err: Error | ZodError, 
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {  
  if (err instanceof ZodError) { 
    return res.status(400).json({ message: err.message });
  }

  const messageAsErrorType = err.message as ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ message });
  }

  return res.status(500).json({ message: err.message });
};

export default errorHandler;