import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { step3GetUsersFromDb } from './steps/step3-get-users-from-db';
import { step5ParseServiceIdsStrInResponse } from './steps/step5-parse-service-ids-str-in-response';
import { step9GetTotalItems } from './steps/step9-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetUsersList } from './interfaces/steps-result-get-users-list.interface';
import { step4TransformUsersInResponse } from './steps/step4-transform-users-in-response';
import { step6ParseCityIdsStrInResponse } from './steps/step6-parse-city-ids-str-in-response';
import { step10SendApi } from './steps/step10-send-api';
import { step7ParseClientIdsStrInResponse } from './steps/step7-parse-client-ids-str-in-response';
import { step8ParseMasterIdsStrInResponse } from './steps/step8-parse-master-ids-str-in-response';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { step2GetRole } from './steps/step2-get-role';

export function getUsersListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetRole, params: [reqBody] },
    { fn: step3GetUsersFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step4TransformUsersInResponse, params: [] },
    { fn: step5ParseServiceIdsStrInResponse, params: [reqBody.role] },
    { fn: step6ParseCityIdsStrInResponse, params: [] },
    { fn: step7ParseClientIdsStrInResponse, params: [reqBody.role] },
    { fn: step8ParseMasterIdsStrInResponse, params: [reqBody.role] },
    { fn: step9GetTotalItems, params: [reqBody.role] },
    { fn: step10SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUsersList = {
    step1GetUserIdByToken: null,
    step2GetRole: null,
    step3GetUsersFromDb: [],
    step3TransformUsersInResponse: [],
    step7GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
