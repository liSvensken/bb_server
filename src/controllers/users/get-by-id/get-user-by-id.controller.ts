import { Request, Response } from 'express';
import { step1GetUserFromDb } from './steps/step1-get-user-from-db';
import { step2ParseInUserResponse } from './steps/step2-parse-in-user-response';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetUser } from './interfaces/steps-result.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step3ParseInServicesResponse } from './steps/step3-parse-in-services-response';
import { step4ParseInCitiesResponse } from './steps/step4-parse-in-cities-response';
import { step6SendApi } from './steps/step6-send-api';

export function getUserByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUserFromDb, params: [reqId] },
    { fn: step2ParseInUserResponse, params: [] },
    { fn: step3ParseInServicesResponse, params: [] },
    { fn: step4ParseInCitiesResponse, params: [] },
    { fn: step6SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetUser = {
    step1GetUserFromDb: [],
    step2ParseInUserResponse: []
  }

  stepsIteration(stepsIter, res, stepsResults);
}
