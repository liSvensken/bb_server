import { Request, Response } from 'express';
import { GetCitiesListRequest } from './interfaces/get-cities-list-request.interface';
import { step1GetCitiesFromDb } from './steps/step1-get-cities-from-db';
import { apiSend } from '../../../utils/api/api-send';
import { step2GetTotalItems } from './steps/step2-get-total-items';
import { CityModel } from '../../../models/city/city.model';

export function getCitiesListController(req: Request, res: Response) {
  let reqBody: GetCitiesListRequest = req.body;

  let responseResult: CityModel[];
  let responseTotalItems: number;

  step1GetCitiesFromDb((err, statusCode, result) => {
    if (!err) {
      responseResult = result;
      step2GetTotalItems((err, statusCode, result) => {
        if (!err) {
          responseTotalItems = result;
          apiSend(res, statusCode, responseResult, null, responseTotalItems);
        } else {
          apiSend(res, statusCode, null, err);
        }
      })
    } else {
      apiSend(res, statusCode, null, err);
    }
  }, reqBody.limit, reqBody.offset)
}
