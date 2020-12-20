import { Request, Response } from 'express';
import { step2GetUserFromDb } from './steps/step2-get-user-from-db';
import { step4TransformUserDbInResponse } from './steps/step4-transform-user-db-in-response';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetUser } from './interfaces/steps-result.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step5ParseServicesDbInResponse } from './steps/step5-parse-services-db-in-response';
import { step6ParseCityDbInResponse } from './steps/step6-parse-city-db-in-response';
import { step9SendApi } from './steps/step9-send-api';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { step3CheckRole } from './steps/step3-check-role';
import { step7ParseMyClientsOrMastersDbInResponse } from './steps/step7-parse-my-clients-or-masters-db-in-response';

export function getUserByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetUserFromDb, params: [reqId] },
    { fn: step3CheckRole, params: [] },
    { fn: step4TransformUserDbInResponse, params: [] },
    { fn: step5ParseServicesDbInResponse, params: [] },
    { fn: step6ParseCityDbInResponse, params: [] },
    { fn: step7ParseMyClientsOrMastersDbInResponse, params: [] },
    { fn: step9SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUser = {
    step1GetUserIdByToken: null,
    step2GetUserFromDb: [],
    step4TransformUserDbInResponse: []
  }

  stepsIteration(stepsIter, res, stepsResults);
}
