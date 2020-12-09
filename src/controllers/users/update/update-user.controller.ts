import { Request, Response } from 'express';
import { step1CheckValidForm } from './steps/step1-check-valid-form';
import { step2CheckOriginalNickname } from './steps/step2-check-original-nickname';
import { step3CheckOriginalEmail } from './steps/step3-check-oiginal-email';
import { step4CheckServicesAnotherTable } from './steps/step4-check-services-another-table';
import { step5CheckCitiesAnotherTable } from './steps/step5-check-cities-another-table';
import { step6UpdateUser } from './steps/step6-update-user';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { UpdateUserRequest } from './interfaces/update-user-request.interface';
import { StepsResultUpdateUser } from './interfaces/steps-result-update-user';
import { step7SendApi } from './steps/step7-send-api';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';

export function updateUserController(req: Request, res: Response) {
  let user: UpdateUserRequest = req.body;

  const steps: StepIterInterface[] = [
    { fn: step1CheckValidForm, params: [user]},
    { fn: step2CheckOriginalNickname, params: [user.nickname] },
    { fn: step3CheckOriginalEmail, params: [user.email] },
    { fn: step4CheckServicesAnotherTable, params: [user.role, user.serviceIds] },
    { fn: step5CheckCitiesAnotherTable, params: [user.cityIds]},
    { fn: step6UpdateUser, params: [user, req.params.id] },
    { fn: step7SendApi, params: [], last: true }
  ];

  const stepsResults: StepsResultUpdateUser = {
    step6UpdateUser: ''
  }

  stepsIteration(steps, res, stepsResults);
}


