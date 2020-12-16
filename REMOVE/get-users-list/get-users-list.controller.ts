// import { Request, Response } from 'express';
// import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
// import { step1GetUsersFromDb } from './steps/step1-get-users-from-db';
// import { step3ParseServiceIdsStrInResponse } from './steps/step3-parse-service-ids-str-in-response';
// import { step5GetTotalItems } from './steps/step5-get-total-items';
// import { StepIterInterface } from '../../src/controllers/common/steps-iteration/interfaces/step-iter.interface';
// import { stepsIteration } from '../../src/controllers/common/steps-iteration/steps-iteration';
// import { StepsResultGetUsersList } from './interfaces/steps-result-get-users-list.interface';
// import { step2TransformUsersInResponse } from './steps/step2-transform-users-in-response';
// import { step4ParseCityIdsStrInResponse } from './steps/step4-parse-city-ids-str-in-response';
// import { step6SendApi } from './steps/step6-send-api';
//
// export function getUsersListController(req: Request, res: Response) {
//   const reqBody: GetUsersListRequest = req.body;
//
//   const stepsIter: StepIterInterface[] = [
//     { fn: step1GetUsersFromDb, params: [reqBody.limit, reqBody.offset] },
//     { fn: step2TransformUsersInResponse, params: [] },
//     { fn: step3ParseServiceIdsStrInResponse, params: [] },
//     { fn: step4ParseCityIdsStrInResponse, params: [] },
//     { fn: step5GetTotalItems, params: [] },
//     { fn: step6SendApi, params: [], last: true },
//   ]
//
//   const stepsResults: StepsResultGetUsersList = {
//     step1GetUsersFromDb: [],
//     step2TransformUsersInResponse: [],
//     step5GetTotalItems: null
//   };
//
//   stepsIteration(stepsIter, res, stepsResults);
// }
