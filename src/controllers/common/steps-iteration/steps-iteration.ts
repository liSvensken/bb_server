import { ErrorInterface } from '../../../utils/errors/error.interface';
import { apiSend } from '../../../utils/api/api-send';
import { Response } from 'express';
import { StepIterInterface } from './interfaces/step-iter.interface';

const stepIteration = (stepValues: IterableIterator<StepIterInterface>, res: Response, stepsResults: any) => {
  const step = stepValues.next().value;
  if (step) {
    const params: any[] = step.params;
    switch (true) {
      case !step.last:
        step.fn((err: ErrorInterface, statusCode: number, nowStepsResults?: any) => {
          if (!err) {
            stepIteration(stepValues, res, nowStepsResults);
          } else {
            apiSend(res, statusCode, null, err);
          }
        }, ...params, stepsResults);
        break;

      default:
        step.fn((err: ErrorInterface, statusCode: number, result?: any, totalItems?: number) => {
          if (!err) {
            apiSend(res, statusCode, result, null, totalItems);
          } else {
            apiSend(res, statusCode, null, err);
          }
        }, ...params, stepsResults);
    }
  }
}

export const stepsIteration = (stepsIter: StepIterInterface[], res: Response, stepsResults: any) => {
  const stepValues = stepsIter.values();

  stepIteration(stepValues, res, stepsResults);
}
