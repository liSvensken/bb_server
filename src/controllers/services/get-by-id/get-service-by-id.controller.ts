import { Request, Response } from 'express';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1GetService } from './steps/step-1-get-service';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultGetService } from './interfaces/steps-result-get-service';
import { step2SendApi } from './steps/step2-send-api';

export function getServiceByIdController(req: Request, res: Response) {
  const reqId: number = JSON.parse(req.params.id);

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetService, params: [reqId] },
    { fn: step2SendApi, params: [], last: true }
  ]

  const stepsResults: StepsResultGetService = {
    step1GetService: []
  }

  stepsIteration(stepsIter, res, stepsResults);
}
