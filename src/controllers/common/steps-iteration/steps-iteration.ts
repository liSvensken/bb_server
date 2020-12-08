import { ErrorInterface } from '../../../utils/errors/error.interface';
import { apiSend } from '../../../utils/api/api-send';
import { Response } from 'express';
import { StepIterInterface } from './interfaces/step-iter.interface';

const stepIteration = (stepValues: IterableIterator<StepIterInterface>, res: Response, stepsResults?: any) => {
  const step = stepValues.next().value;
  if (step) {
    const params: any[] = step.params;
    switch (true) {
      case !step.last:
        step.fn((err: ErrorInterface, statusCode: number, stepsResults?: any) => {
          if (!err) {
            stepIteration(stepValues, res, stepsResults);
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

// while (continueIter) {
//   step = stepValues.next().value;
//   if (step) {
//     const params: any[] = step.params;
//     switch (true) {
//       case step.next:
//         step.fn((err: ErrorInterface, statusCode: number) => {
//           if (err) {
//             continueIter = false;
//             apiSend(res, statusCode, null, err);
//           }
//         }, ...params);
//         break;
//
//       case !step.next:
//         step.fn((err: ErrorInterface, statusCode: number, result?: any) => {
//           if (!err) {
//             apiSend(res, statusCode, 200, null);
//           } else {
//             apiSend(res, statusCode, null, err);
//           }
//         }, ...params);
//         continueIter = false;
//         break;
//     }
//   } else {
//     continueIter = false;
//   }
//   console.log(continueIter)
// }

// let idxStep = 0;
//
// export  const stepsIteration = (steps: StepIterInterface[], step: StepIterInterface, res: Response) => {
//   const params: any[] = step.params;
//   switch (true) {
//     case step.next:
//       step.fn((err: ErrorInterface, statusCode: number, result?: any) => {
//         if (!err) {
//           idxStep++;
//           if (result) {
//             steps[idxStep].params.push(result);
//           }
//           stepsIteration(steps, steps[idxStep], res);
//         } else {
//           apiSend(res, statusCode, null, err);
//         }
//       }, ...params);
//       break;
//
//     case !step.next:
//       step.fn((err: ErrorInterface, statusCode: number, result?: any) => {
//         if (!err) {
//           apiSend(res, 200, result, null);
//         } else {
//           apiSend(res, statusCode, null, err);
//         }
//       }, ...params);
//       break;
//   }
// }
