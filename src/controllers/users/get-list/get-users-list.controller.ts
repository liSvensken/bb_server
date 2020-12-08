import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { step1GetUsersFromDb } from './steps/step1-get-users-from-db';
import { step3ParseServicesInResponse } from './steps/step3-parse-services-in-response';
import { step5GetTotalItems } from './steps/step5-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResult } from './interfaces/steps-result';
import { step2ParseUsersInResponse } from './steps/step2-parse-users-in-response';
import { step4ParseCitiesInResponse } from './steps/step4-parse-cities-in-response';

export function getUsersListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetUsersFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2ParseUsersInResponse, params: [] },
    { fn: step3ParseServicesInResponse, params: [] },
    { fn: step4ParseCitiesInResponse, params: [] },
    { fn: step5GetTotalItems, params: [], last: true },
  ]

  const stepsResults: StepsResult = { // todo
    step1GetUsersFromDb: [],
    step2ParseUsersInResponse: [],
    step5GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);

  // step1GetUsersFromDb((err, statusCode, result) => {
  //   if (!err) {
  //     step2ParseInUsersResponse((err, statusCode, result) => {
  //       if (!err) {
  //         responseResult = result;
  //         step3GetTotalItems((err, statusCode, result) => {
  //           if (!err) {
  //             responseTotalItems = result;
  //             apiSend(res, 200, responseResult, null, responseTotalItems);
  //           } else {
  //             apiSend(res, statusCode, null, err);
  //           }
  //         });
  //       } else {
  //         apiSend(res, statusCode, null, err);
  //       }
  //     }, result);
  //   } else {
  //     apiSend(res, statusCode, null, err);
  //   }
  // }, reqBody.limit, reqBody.offset)
}
