import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1DeleteUser } from './steps/step1-delete-user';
import { StepsResultsDeleteUser } from './interfaces/steps-results-delete-user.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step2SendApi } from './steps/step2-send-api';

export function deleteUserController(req: Request, res: Response) {
  const reqId: string = req.params.id;

  const stepsIter: StepIterInterface[] = [
    { fn: step1DeleteUser, params: [reqId] },
    { fn: step2SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultsDeleteUser = {
    step1DeleteUser: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
