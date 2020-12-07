import { Request, Response } from 'express';
import { GetUsersListRequest } from './interfaces/get-users-list-request.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { step1GetUsersFromDb } from './steps/step1-get-users-from-db';

export function getListController(req: Request, res: Response) {
  const reqBody: GetUsersListRequest = req.body;

  const stepsIter = [
    { fn: step1GetUsersFromDb, params: [reqBody], next: false },
    // { fn: step2GetServiceById, params: [reqBody], next: false },
    // { fn: step3GetCitiesById, params: [reqBody], next: false },
    // { fn: step4GetUserResponse, params: [reqBody], next: false },
  ]

  stepsIteration(stepsIter, res);
}
