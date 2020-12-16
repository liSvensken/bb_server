import { Request, Response } from 'express';
import { GetCitiesListRequest } from './interfaces/get-cities-list-request.interface';
import { step2GetCitiesFromDb } from './steps/step2-get-cities-from-db';
import { step3GetTotalItems } from './steps/step3-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetCitiesList } from './interfaces/steps-result-get-cities-list';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step4SendApi } from './steps/step4-send-api';
import { step1CheckToken } from './steps/step1-check-token';

export function getCitiesListController(req: Request, res: Response) {
  const reqBody: GetCitiesListRequest = req.body;
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckToken, params: [token] },
    { fn: step2GetCitiesFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step3GetTotalItems, params: [] },
    { fn: step4SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetCitiesList = {
    step2GetCitiesFromDb: [],
    step3GetTotalItems: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
