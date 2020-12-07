import { Response } from 'express';
import { ErrorInterface } from '../errors/error.interface';
import { CommonResponse } from '../../controllers/common/interfaces/common-response';

export function apiSend(res: Response, statusCode: number, result: any = null, err: ErrorInterface = null,
                        totalItems?: number): void {
  const response: CommonResponse = {
    result: null,
    error: null,
    totalItems: null,
  };

  response.result = result;
  response.error = err;
  response.totalItems = totalItems;
  res.status(statusCode);
  res.json(response);
}
