import { Response } from 'express';
import { ErrorInterface } from '../errors/error.interface';
import { CommonResponse } from '../../controllers/common/interfaces/common-response.interface';

export function apiSend(res: Response, statusCode: number, result: any = null, err: ErrorInterface = null,
                        token?: string, totalItems?: number): void {
  const response: CommonResponse = {
    result: null,
    error: null,
    token: null,
    totalItems: null,
  };

  response.result = result;
  response.error = err;
  response.token = token;
  response.totalItems = totalItems;
  res.status(statusCode);
  res.json(response);
}
