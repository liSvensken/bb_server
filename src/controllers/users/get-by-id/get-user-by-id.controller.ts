import { Request, Response } from 'express';
import { step2GetUserFromDb } from './steps/step2-get-user-from-db';
import { step4TransformInUserResponse } from './steps/step4-transform-in-user-response';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetUser } from './interfaces/steps-result.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step5ParseInServicesResponse } from './steps/step5-parse-in-services-response';
import { step6ParseCityIdsStrInResponse } from './steps/step6-parse-city-ids-str-in-response';
import { step9SendApi } from './steps/step9-send-api';
import { step7ParseClientIdsStrInResponse } from './steps/step7-parse-client-ids-str-in-response';
import { step8ParseMasterIdsStrInResponse } from './steps/step8-parse-master-ids-str-in-response';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';
import { step3CheckRole } from './steps/step3-check-role';

export function getUserByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token] },
    { fn: step2GetUserFromDb, params: [reqId] },
    { fn: step3CheckRole, params: [] },
    { fn: step4TransformInUserResponse, params: [] },
    { fn: step5ParseInServicesResponse, params: [] },
    { fn: step6ParseCityIdsStrInResponse, params: [] },
    { fn: step7ParseClientIdsStrInResponse, params: [] },
    { fn: step8ParseMasterIdsStrInResponse, params: [] },
    { fn: step9SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUser = {
    step1GetUserIdByToken: null,
    step2GetUserFromDb: [],
    step3TransformInUserResponse: []
  }

  stepsIteration(stepsIter, res, stepsResults);
}
