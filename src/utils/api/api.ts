import { Response } from 'express';
import { ErrorInterface } from './interfaces/error.interface';

export function apiSend(res: Response, statusCode: number, result: any = null, err: any = null): void {
  const response: { error: {} | null, result: {} | null } = {
    error: err as ErrorInterface,
    result: null
  };

  response.result = result;
  response.error = err;
  res.status(statusCode);
  res.json(response);
}
