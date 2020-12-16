import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step2GetCity } from './steps/step2-get-city';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step3SendApi } from './steps/step3-send-api';
import { StepsResultGetCity } from './interfaces/steps-result-get-city';
import { step1CheckToken } from './steps/step1-check-token';

export function getCityByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckToken, params: [token] },
    { fn: step2GetCity, params: [reqId] },
    { fn: step3SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetCity = {
    step2GetCity: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
