import { Request, Response } from 'express';
import { UserAuthorizationRequest } from './interfaces/user-authorization-request.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultAuthorization } from './interfaces/steps-result-authorization.interface';
import { step1GetUserFromDb } from './steps/step1-get-user-from-db';
import { step2ComparePassword } from './steps/step2-compare-password';
import { step3CreateToken } from './steps/step3-create-token';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step9SendApi } from './steps/step9-send-api';
import { step5ParseInServicesResponse } from './steps/step5-parse-in-services-response';
import { step6ParseCityIdsStrInResponse } from './steps/step6-parse-city-ids-str-in-response';
import { step7ParseClientIdsStrInResponse } from './steps/step7-parse-client-ids-str-in-response';
import { step8ParseMasterIdsStrInResponse } from './steps/step8-parse-master-ids-str-in-response';
import { step4TransformInUserResponse } from './steps/step4-transform-in-user-response';

export function authorizationController(req: Request, res: Response) {
  const user: UserAuthorizationRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserFromDb, params: [user.login] },
    { fn: step2ComparePassword , params: [user.password] },
    { fn: step3CreateToken, params: [] },
    { fn: step4TransformInUserResponse, params: [] },
    { fn: step5ParseInServicesResponse, params: [] },
    { fn: step6ParseCityIdsStrInResponse, params: [] },
    { fn: step7ParseClientIdsStrInResponse, params: [] },
    { fn: step8ParseMasterIdsStrInResponse, params: [] },
    { fn: step9SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultAuthorization = {
    step1GetUserFromDb: null,
    step3CreateToken: null,
    step4TransformInUserResponse: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
