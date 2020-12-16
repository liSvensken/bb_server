import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step2DeleteUser } from './steps/step2-delete-user';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step1CheckToken } from './steps/step1-check-token';

export function deleteUserController(req: Request, res: Response) {
  const reqId: string = req.params.id;
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckToken, params: [token]},
    { fn: step2DeleteUser, params: [reqId], last: true }
  ]

  stepsIteration(stepsIter, res, null);
}
