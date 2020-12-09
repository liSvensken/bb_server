import { Request, Response } from 'express';
import { GetCitiesListRequest } from './interfaces/get-cities-list-request.interface';
import { step1GetCitiesFromDb } from './steps/step1-get-cities-from-db';
import { step2GetTotalItems } from './steps/step2-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetCitiesList } from './interfaces/steps-result-get-cities-list';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step3SendApi } from './steps/step3-send-api';

export function getCitiesListController(req: Request, res: Response) {
  let reqBody: GetCitiesListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetCitiesFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2GetTotalItems, params: [] },
    { fn: step3SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetCitiesList = {
    step1GetCitiesFromDb: [],
    step2GetTotalItems: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
