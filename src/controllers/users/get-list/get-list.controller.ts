import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1GetUsers } from './steps/step1-get-users';

export function getListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;

  const stepsIter = [
    { fn: step1GetUsers, params: [reqBody.limit, reqBody.offset], next: false },
    // { fn: step2GetServicesById, params: ['qwe'], next: true },
    // { fn: step3GetCitiesById, params: [reqBody], next: false },
    // { fn: step4GetUserResponse, params: [reqBody], next: false },
  ]

  stepsIteration(stepsIter, res);
}
