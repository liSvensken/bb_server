import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step2GetService } from './steps/step2-get-service';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetService } from './interfaces/steps-result-get-service';
import { step3SendApi } from './steps/step3-send-api';
import { step1CheckToken } from './steps/step1-check-token';

export function getServiceByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);
  const token: string = req.headers.authorization.split(' ')[1];

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckToken, params: [token] },
    { fn: step2GetService, params: [reqId] },
    { fn: step3SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetService = {
    step2GetService: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}
