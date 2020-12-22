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
        step.fn((err: ErrorInterface, statusCode: number, nowStepsResults?: any, notFound?: boolean) => {
          if (statusCode === 200 && !notFound) {
            stepIteration(stepValues, res, nowStepsResults);
          } else if (statusCode === 200 && notFound) {
            apiSend(res, statusCode, null, null);
          } else if (statusCode === 204) {
            apiSend(res, statusCode, null, null);
          } else {
            apiSend(res, statusCode, null, err);
          }
        }, ...params, stepsResults);
        break;

      default:
        step.fn((err: ErrorInterface, statusCode: number, result?: any, totalItems?: number, token?: string) => {
          if (statusCode === 200) {
            apiSend(res, statusCode, result, null, totalItems, token);
          } else if (statusCode === 204) {
            apiSend(res, statusCode, null, null);
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
