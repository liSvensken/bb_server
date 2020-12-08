import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1DeleteUser } from './steps/step1-delete-user';

export function deleteUserController(req: Request, res: Response) {
  const reqId: string = req.params.id;

  const stepsIter = [
    { fn: step1DeleteUser, params: [reqId], next: false }
  ]

  stepsIteration(stepsIter, res);
}
