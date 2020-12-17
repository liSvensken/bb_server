import { Request, Response } from 'express';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { StepsResultGetUserByToken } from './interfaces/steps-result-get-user-by-token.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step2GetUserFromDb } from './steps/step2-get-user-from-db';
import { step8SendApi } from './steps/step8-send-api';
import { step3TransformUserDbInResponse } from './steps/step3-transform-user-db-in-response';
import { step4ParseServicesDbInResponse } from './steps/step4-parse-services-db-in-response';
import { step5ParseCityDbInResponse } from './steps/step5-parse-city-db-in-response';
import { step6ParseMyClientsDbInResponse } from './steps/step6-parse-my-clients-db-in-response';
import { step7ParseMyMastersDbInResponse } from './steps/step7-parse-my-masters-db-in-response';

export function getUserByToken(req: Request, res: Response) {
  const token = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetUserFromDb, params: [] },
    { fn: step3TransformUserDbInResponse, params: [] },
    { fn: step4ParseServicesDbInResponse, params: [] },
    { fn: step5ParseCityDbInResponse, params: [] },
    { fn: step6ParseMyClientsDbInResponse, params: [] },
    { fn: step7ParseMyMastersDbInResponse, params: [] },
    { fn: step8SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUserByToken = {
    step1GetUserId: null,
    step2GetUserFromDb: null,
    step3TransformUserDbInResponse: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
