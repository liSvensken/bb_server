import { Request, Response } from 'express';
import { UserAuthorizationRequest } from './interfaces/user-authorization-request.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultAuthorization } from './interfaces/steps-result-authorization.interface';
import { step1GetUserFromDb } from './steps/step1-get-user-from-db';
import { step2ComparePassword } from './steps/step2-compare-password';
import { step3CreateToken } from './steps/step3-create-token';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step9SendApi } from './steps/step9-send-api';
import { step5ParseServicesDbInResponse } from './steps/step5-parse-services-db-in-response';
import { step6ParseCityDbInResponse } from './steps/step6-parse-city-db-in-response';
import { step7ParseMyClientsOrMastersDbInResponse } from './steps/step7-parse-my-clients-or-masters-db-in-response';
import { step4TransformUserDbInResponse } from './steps/step4-transform-user-db-in-response';

export function authorizationController(req: Request, res: Response) {
  const user: UserAuthorizationRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserFromDb, params: [user.login] },
    { fn: step2ComparePassword , params: [user.password] },
    { fn: step3CreateToken, params: [] },
    { fn: step4TransformUserDbInResponse, params: [] },
    { fn: step5ParseServicesDbInResponse, params: [] },
    { fn: step6ParseCityDbInResponse, params: [] },
    { fn: step7ParseMyClientsOrMastersDbInResponse, params: [] },
    { fn: step9SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultAuthorization = {
    step1GetUserFromDb: null,
    step3CreateToken: null,
    step4TransformUserDbInResponse: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
