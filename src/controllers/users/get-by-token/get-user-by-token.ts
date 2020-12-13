import { Request, Response } from 'express';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { StepsResultGetUserByToken } from './interfaces/steps-result-get-user-by-token.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step2GetUserFromDb } from './steps/step2-get-user-from-db';
import { step6SendApi } from './steps/step6-send-api';
import { step3ParseInUserResponse } from './steps/step3-parse-in-user-response';
import { step4ParseInServicesResponse } from './steps/step4-parse-in-services-response';
import { step5ParseInCitiesResponse } from './steps/step5-parse-in-cities-response';

export function getUserByToken(req: Request, res: Response) {
  const token = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetUserFromDb, params: [] },
    { fn: step3ParseInUserResponse, params: [] },
    { fn: step4ParseInServicesResponse, params: [] },
    { fn: step5ParseInCitiesResponse, params: [] },
    { fn: step6SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUserByToken = {
    step1GetUserId: null,
    step2GetUserFromDb: null,
    step3ParseInUserResponse: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
