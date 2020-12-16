import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { step1GetUsersFromDb } from './steps/step1-get-users-from-db';
import { step3ParseServiceIdsStrInResponse } from './steps/step3-parse-service-ids-str-in-response';
import { step7GetTotalItems } from './steps/step7-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetUsersList } from './interfaces/steps-result-get-users-list.interface';
import { step2TransformUsersInResponse } from './steps/step2-transform-users-in-response';
import { step4ParseCityIdsStrInResponse } from './steps/step4-parse-city-ids-str-in-response';
import { step8SendApi } from './steps/step8-send-api';
import { step5ParseClientIdsStrInResponse } from './steps/step5-parse-client-ids-str-in-response';
import { step6ParseMasterIdsStrInResponse } from './steps/step6-parse-master-ids-str-in-response';

export function getUsersListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUsersFromDb, params: [reqBody] },
    { fn: step2TransformUsersInResponse, params: [] },
    { fn: step3ParseServiceIdsStrInResponse, params: [reqBody.role] },
    { fn: step4ParseCityIdsStrInResponse, params: [] },
    { fn: step5ParseClientIdsStrInResponse, params: [reqBody.role] },
    { fn: step6ParseMasterIdsStrInResponse, params: [reqBody.role] },
    { fn: step7GetTotalItems, params: [reqBody.role] },
    { fn: step8SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUsersList = {
    step1GetUsersFromDb: [],
    step2TransformUsersInResponse: [],
    step6GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
