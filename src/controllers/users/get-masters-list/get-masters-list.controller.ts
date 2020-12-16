import { Request, Response } from 'express';
import { GetMastersListRequest } from './interfaces/get-masters-list-request.interface';
import { step1GetMastersFromDb } from './steps/step1-get-masters-from-db';
import { step3ParseServiceIdsStrInResponse } from './steps/step3-parse-service-ids-str-in-response';
import { step6GetTotalItems } from './steps/step6-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetMastersList } from './interfaces/steps-result-get-masters-list.interface';
import { step2TransformMastersInResponse } from './steps/step2-transform-masters-in-response';
import { step4ParseCityIdsStrInResponse } from './steps/step4-parse-city-ids-str-in-response';
import { step7SendApi } from './steps/step7-send-api';
import { step5ParseClientIdsStrInResponse } from './steps/step5-parse-client-ids-str-in-response';

export function getMastersListController(req: Request, res: Response) {
  const reqBody: GetMastersListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetMastersFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2TransformMastersInResponse, params: [] },
    { fn: step3ParseServiceIdsStrInResponse, params: [] },
    { fn: step4ParseCityIdsStrInResponse, params: [] },
    { fn: step5ParseClientIdsStrInResponse, params: [] },
    { fn: step6GetTotalItems, params: [] },
    { fn: step7SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetMastersList = {
    step1GetMastersFromDb: [],
    step2TransformMastersInResponse: [],
    step6GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
