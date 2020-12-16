import { Request, Response } from 'express';
import { GetServicesListRequest } from './interfaces/get-services-list-request.interface';
import { step2GetServicesFromDb } from './steps/step2-get-services-from-db';
import { step3GetTotalItems } from './steps/step3-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetServicesList } from './interfaces/steps-result-get-services-list';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step4SendApi } from './steps/step4-send-api';
import { step1CheckToken } from './steps/step1-check-token';

export function getServicesListController(req: Request, res: Response) {
  const reqBody: GetServicesListRequest = req.body;
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckToken, params: [token] },
    { fn: step2GetServicesFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step3GetTotalItems, params: [] },
    { fn: step4SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetServicesList = {
    step2GetServicesFromDb: [],
    step3GetTotalItems: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
