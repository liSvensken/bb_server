import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { step1GetUsersFromDb } from './steps/step1-get-users-from-db';
import { step2ParseInUsersResponse } from './steps/step2-parse-in-users-response';
import { apiSend } from '../../../utils/api/api-send';
import { step3GetTotalItems } from './steps/step3-get-total-items';
import { UserDbModel } from '../../../models/user/user-db.model';

export function getUsersListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;

  let responseResult: UserDbModel[];
  let responseTotalItems: number;

  step1GetUsersFromDb((err, statusCode, result) => {
    if (!err) {
      step2ParseInUsersResponse((err, statusCode, result) => {
        if (!err) {
          responseResult = result;
          step3GetTotalItems((err, statusCode, result) => {
            if (!err) {
              responseTotalItems = result;
              apiSend(res, statusCode, responseResult, null, responseTotalItems);
            } else {
              apiSend(res, statusCode, null, err);
            }
          });
        } else {
          apiSend(res, statusCode, null, err);
        }
      }, result);
    } else {
      apiSend(res, statusCode, null, err);
    }
  }, reqBody.limit, reqBody.offset)
}
