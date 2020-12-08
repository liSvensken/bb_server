import { Request, Response } from 'express';
import { apiSend } from '../../../utils/api/api-send';
import { step1GetUser } from './steps/step1-get-user';
import { step2ParseInUserResponse } from './steps/step2-parse-in-user-response';

export function getUserByIdController(req: Request, res: Response) {
  const reqId: string = req.params.id;

  step1GetUser((err, statusCode, result) => {
    if (!err) {
      step2ParseInUserResponse((err, statusCode, result) => {
        if (!err) {
          apiSend(res, 200, result, null);
        } else {
          apiSend(res, statusCode, null, err);
        }
      }, result)
    } else {
      apiSend(res, statusCode, null, err);
    }
  }, reqId)
}
