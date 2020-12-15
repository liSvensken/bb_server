import { Request, Response } from 'express';
import { GetClientsListRequest } from './interfaces/get-clients-list-request.interface';
import { step1GetClientsFromDb } from './steps/step1-get-clients-from-db';
import { step3ParseServicesInResponse } from './steps/step3-parse-services-in-response';
import { step5GetTotalItems } from './steps/step5-get-total-items';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { StepsResultGetClientsList } from './interfaces/steps-clients-get-users-list.interface';
import { step2ParseClientsInResponse } from './steps/step2-parse-clients-in-response';
import { step4ParseCitiesInResponse } from './steps/step4-parse-cities-in-response';
import { step6SendApi } from './steps/step6-send-api';

export function getClientsListController(req: Request, res: Response) {
  const reqBody: GetClientsListRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1GetClientsFromDb, params: [reqBody.limit, reqBody.offset] },
    { fn: step2ParseClientsInResponse, params: [] },
    { fn: step3ParseServicesInResponse, params: [] },
    { fn: step4ParseCitiesInResponse, params: [] },
    { fn: step5GetTotalItems, params: [] },
    { fn: step6SendApi, params: [], last: true },
  ]

  const stepsResults: StepsResultGetClientsList = {
    step1GetClientsFromDb: [],
    step2ParseClientsInResponse: [],
    step5GetTotalItems: null
  };

  stepsIteration(stepsIter, res, stepsResults);
}
