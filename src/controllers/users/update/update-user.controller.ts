import { Request, Response } from 'express';
import { step2CheckValidForm } from './steps/step2-check-valid-form';
import { step3CheckOriginalNickname } from './steps/step3-check-original-nickname';
import { step4CheckOriginalEmail } from './steps/step3-check-oiginal-email';
import { step5CheckServicesAnotherTable } from './steps/step5-check-services-another-table';
import { step6CheckCitiesAnotherTable } from './steps/step6-check-cities-another-table';
import { step7UpdateUser } from './steps/step7-update-user';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { UpdateUserRequest } from './interfaces/update-user-request.interface';
import { StepsResultUpdateUser } from './interfaces/steps-result-update-user.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { step1GetUserIdByToken } from './steps/step1-get-user-id-by-token';

export function updateUserController(req: Request, res: Response) {
  const user: UpdateUserRequest = req.body;
  const token: string = req.headers.authorization.split(' ')[1];

  const steps: StepIterInterface[] = [
    { fn: step1GetUserIdByToken, params: [token]},
    { fn: step2CheckValidForm, params: [user]},
    { fn: step3CheckOriginalNickname, params: [user.nickname] },
    { fn: step4CheckOriginalEmail, params: [user.email] },
    { fn: step5CheckServicesAnotherTable, params: [user.role, user.serviceIds] },
    { fn: step6CheckCitiesAnotherTable, params: [user.cityId]},
    { fn: step7UpdateUser, params: [user], last: true }
  ];

  const stepsResults: StepsResultUpdateUser = {
    step1GetUserIdByToken: null
  }

  stepsIteration(steps, res, stepsResults);
}


