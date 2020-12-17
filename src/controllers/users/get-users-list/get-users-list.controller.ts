import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { step3GetUsersFromDb } from './steps/step3-get-users-from-db';
import { step5ParseServicesDbInResponse } from './steps/step5-parse-services-db-in-response';
import { step9GetTotalItems } from './steps/step9-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetUsersList } from './interfaces/steps-result-get-users-list.interface';
import { step4TransformUsersDbInResponse } from './steps/step4-transform-users-db-in-response';
import { step6ParseCityDbInResponse } from './steps/step6-parse-city-db-in-response';
import { step10SendApi } from './steps/step10-send-api';
import { step7ParseMyClientsDbInResponse } from './steps/step7-parse-my-clients-db-in-response';
import { step8ParseMastersDbInResponse } from './steps/step8-parse-masters-db-in-response';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { step2GetCurrentUserRole } from './steps/step2-get-current-user-role';

export function getUsersListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetCurrentUserRole, params: [] },
    { fn: step3GetUsersFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step4TransformUsersDbInResponse, params: [] },
    { fn: step5ParseServicesDbInResponse, params: [reqBody.role] },
    { fn: step6ParseCityDbInResponse, params: [] },
    { fn: step7ParseMyClientsDbInResponse, params: [reqBody.role] },
    { fn: step8ParseMastersDbInResponse, params: [reqBody.role] },
    { fn: step9GetTotalItems, params: [reqBody.role] },
    { fn: step10SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUsersList = {
    step1GetUserIdByToken: null,
    step2GetCurrentUserRole: null,
    step3GetUsersFromDb: [],
    step4TransformUsersDbInResponse: [],
    step7GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
