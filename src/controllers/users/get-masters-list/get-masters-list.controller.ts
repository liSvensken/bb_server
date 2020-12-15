import { Request, Response } from 'express';
import { GetMastersListRequest } from './interfaces/get-masters-list-request.interface';
import { step1GetMastersFromDb } from './steps/step1-get-masters-from-db';
import { step3ParseServicesInResponse } from './steps/step3-parse-services-in-response';
import { step5GetTotalItems } from './steps/step5-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetMastersList } from './interfaces/steps-result-get-masters-list.interface';
import { step2ParseMastersInResponse } from './steps/step2-parse-masters-in-response';
import { step4ParseCitiesInResponse } from './steps/step4-parse-cities-in-response';
import { step6SendApi } from './steps/step6-send-api';

export function getMastersListController(req: Request, res: Response) {
  const reqBody: GetMastersListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetMastersFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2ParseMastersInResponse, params: [] },
    { fn: step3ParseServicesInResponse, params: [] },
    { fn: step4ParseCitiesInResponse, params: [] },
    { fn: step5GetTotalItems, params: [] },
    { fn: step6SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetMastersList = {
    step1GetMastersFromDb: [],
    step2ParseMastersInResponse: [],
    step5GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
