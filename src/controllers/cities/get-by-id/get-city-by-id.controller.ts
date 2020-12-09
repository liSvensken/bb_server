import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1GetCity } from './steps/step1-get-city';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step2SendApi } from './steps/step2-send-api';
import { StepsResultGetCity } from './interfaces/steps-result-get-city';

export function getCityByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetCity, params: [reqId] },
    { fn: step2SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetCity = {
    step1GetCity: []
  }

  stepsIteration(stepsIter, res, stepsResults);
}
