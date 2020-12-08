import { Request, Response } from 'express';
import { step1CheckValidForm } from './steps/step1-check-valid-form';
import { step2CheckOriginalNickname } from './steps/step2-check-original-nickname';
import { step3CheckOriginalEmail } from './steps/step3-check-oiginal-email';
import { step4CheckServicesAnotherTable } from './steps/step4-check-services-another-table';
import { step5CheckCitiesAnotherTable } from './steps/step5-check-cities-another-table';
import { step6UpdateFields } from './steps/step6-update-fields';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { UpdateUserRequest } from './interfaces/update-user-request.interface';

export function updateUserController(req: Request, res: Response) {
  console.log(req.body)
  let user: UpdateUserRequest = req.body;

  const steps = [
    { fn: step1CheckValidForm, params: [user], next: true },
    { fn: step2CheckOriginalNickname, params: [user.nickname], next: true },
    { fn: step3CheckOriginalEmail, params: [user.email], next: true },
    { fn: step4CheckServicesAnotherTable, params: [user.role, user.serviceIds], next: true },
    { fn: step5CheckCitiesAnotherTable, params: [user.cityIds], next: true },
    { fn: step6UpdateFields, params: [user, req.params.id], next: false }
  ];

  stepsIteration(steps, res);
}


