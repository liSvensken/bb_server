import { Request, Response } from 'express';
import { GetClientsListRequest } from './interfaces/get-clients-list-request.interface';
import { step1GetClientsFromDb } from './steps/step1-get-clients-from-db';
import { step3ParseServiceIdsStrInResponse } from './steps/step3-parse-service-ids-str-in-response';
import { step6GetTotalItems } from './steps/step6-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetClientsList } from './interfaces/steps-clients-get-users-list.interface';
import { step2TransformClientsInResponse } from './steps/step2-transform-clients-in-response';
import { step4ParseCityIdsStrInResponse } from './steps/step4-parse-city-ids-str-in-response';
import { step7SendApi } from './steps/step7-send-api';
import { step5ParseMasterIdsStrInResponse } from './steps/step5-parse-master-ids-str-in-response';

export function getClientsListController(req: Request, res: Response) {
  const reqBody: GetClientsListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetClientsFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2TransformClientsInResponse, params: [] },
    { fn: step3ParseServiceIdsStrInResponse, params: [] },
    { fn: step4ParseCityIdsStrInResponse, params: [] },
    { fn: step5ParseMasterIdsStrInResponse, params: [] },
    { fn: step6GetTotalItems, params: [] },
    { fn: step7SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetClientsList = {
    step1GetClientsFromDb: [],
    step2TransformClientsInResponse: [],
    step5GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
