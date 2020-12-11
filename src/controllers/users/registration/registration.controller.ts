import { Request, Response } from 'express';
import { step1CheckValidForm } from './steps/step1-check-valid-form';
import { step2CheckOriginalNickname } from './steps/step2-check-original-nickname';
import { step3CheckOriginalEmail } from './steps/step3-check-oiginal-email';
import { step4CheckServicesAnotherTable } from './steps/step4-check-services-another-table';
import { step5CheckCitiesAnotherTable } from './steps/step5-check-cities-another-table';
import { step7CreateUser } from './steps/step7-create-user';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { UserRegistrationRequest } from './interfaces/user-registration-request.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultRegistration } from './interfaces/steps-result-registration.interface';
import { step8SendApi } from './steps/step8-send-api';
import { step6HashPassword } from './steps/step6-hash-password';

export function registrationController(req: Request, res: Response) {
  let user: UserRegistrationRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckValidForm, params: [user] },
    { fn: step2CheckOriginalNickname, params: [user.nickname] },
    { fn: step3CheckOriginalEmail, params: [user.email] },
    { fn: step4CheckServicesAnotherTable, params: [user.role, user.serviceIds] },
    { fn: step5CheckCitiesAnotherTable, params: [user.cityIds] },
    { fn: step6HashPassword, params: [user] },
    { fn: step7CreateUser, params: [] },
    { fn: step8SendApi, params: [], last: true }
  ];

  const stepsResults: StepsResultRegistration = {
    step6HashPassword: null,
    step7CreateUser: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}

