import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1GetCity } from './steps/step1-get-city';

export function getCityByIdController(req: Request, res: Response) {
  const reqId: string = req.params.id;

  const stepsIter = [
    { fn: step1GetCity, params: [reqId], last: true }
  ]

  // stepsIteration(stepsIter, res);
}
