import { Request, Response } from 'express';
import { GetServicesListRequest } from './interfaces/get-services-list-request.interface';
import { step1GetServicesFromDb } from './steps/step1-get-services-from-db';
import { apiSend } from '../../../utils/api/api-send';
import { step2GetTotalItems } from './steps/step2-get-total-items';
import { ServiceModel } from '../../../models/service/service.model';

export function getServicesListController(req: Request, res: Response) {
  let reqBody: GetServicesListRequest = req.body;

  let responseResult: ServiceModel[];
  let responseTotalItems: number;

  step1GetServicesFromDb((err, statusCode, result) => {
    if (!err) {
      responseResult = result;
      step2GetTotalItems((err, statusCode, result) => {
        if (!err) {
          responseTotalItems = result;
          apiSend(res, 200, responseResult, null, responseTotalItems);
        } else {
          apiSend(res, statusCode, null, err);
        }
      })
    } else {
      apiSend(res, statusCode, null, err);
    }
  }, reqBody.limit, reqBody.offset)
}
