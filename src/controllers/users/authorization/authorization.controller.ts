import { Request, Response } from 'express';
import { UserAuthorizationRequest } from './interfaces/user-authorization-request.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultAuthorization } from './interfaces/steps-result-authorization.interface';
import { step1GetUserFromDb } from './steps/step1-get-user-from-db';
import { step2ComparePassword } from './steps/step2-compare-password';
import { step3CreateToken } from './steps/step3-create-token';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step4AuthResult } from './steps/step4-auth-result';
import { step5SendApi } from './steps/step5-send-api';

export function authorizationController(req: Request, res: Response) {
  const user: UserAuthorizationRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserFromDb, params: [user.login] },
    { fn: step2ComparePassword , params: [user.password] },
    { fn: step3CreateToken, params: [] },
    { fn: step4AuthResult, params: [] },
    { fn: step5SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultAuthorization = {
    step1GetUserFromDb: null,
    step3CreateToken: null,
    step4AuthResult: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
