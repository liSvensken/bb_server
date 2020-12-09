import { Request, Response } from 'express';
import { GetServicesListRequest } from './interfaces/get-services-list-request.interface';
import { step1GetServicesFromDb } from './steps/step1-get-services-from-db';
import { step2GetTotalItems } from './steps/step2-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetServicesList } from './interfaces/steps-result-get-services-list';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step3SendApi } from './steps/step3-send-api';

export function getServicesListController(req: Request, res: Response) {
  let reqBody: GetServicesListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetServicesFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2GetTotalItems, params: [] },
    { fn: step3SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetServicesList = {
    step1GetServicesFromDb: [],
    step2GetTotalItems: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
