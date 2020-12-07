import { ErrorInterface } from '../../../utils/errors/error.interface';
import { apiSend } from '../../../utils/api/api';
import { Response } from 'express';
import { StepIterInterface } from './interfaces/step-iter.interface';

export const stepsIteration = (stepsIter: StepIterInterface[], res: Response) => {
  let continueIter = true;
  const stepValues = stepsIter.values();

  while (continueIter) {
    const step = stepValues.next().value;
    if (step) {
      const params: any[] = step.params;
      switch (true) {
        case step.next:
          step.fn((err: ErrorInterface, statusCode: number, result?: any) => {
            if (err) {
              continueIter = false;
              apiSend(res, statusCode, null, err);
            }
          }, ...params);
          break;

        case !step.next:
          step.fn((err: ErrorInterface, statusCode: number, result?: any) => {
            if (!err) {
              apiSend(res, 200, result, null);
            } else {
              apiSend(res, statusCode, null, err);
            }
          }, ...params);
          continueIter = false;
          break;
      }
    } else {
      continueIter = false;
    }
  }
}
