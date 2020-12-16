import { Request, Response } from 'express';
import { step1CheckValidForm } from './steps/step1-check-valid-form';
import { step2CheckOriginalNickname } from './steps/step2-check-original-nickname';
import { step3CheckOriginalEmail } from './steps/step3-check-oiginal-email';
import { step5CreateUser } from './steps/step5-create-user';
import { stepsIteration } from '../../common/steps-iteration/steps-iteration';
import { UserRegistrationRequest } from './interfaces/user-registration-request.interface';
import { StepIterInterface } from '../../common/steps-iteration/interfaces/step-iter.interface';
import { StepsResultRegistration } from './interfaces/steps-result-registration.interface';
import { step7SendApi } from './steps/step7-send-api';
import { step4HashPassword } from './steps/step4-hash-password';
import { step6CreateToken } from './steps/step6-create-token';

export function registrationController(req: Request, res: Response) {
  const user: UserRegistrationRequest = req.body;

  const stepsIter: StepIterInterface[] = [
    { fn: step1CheckValidForm, params: [user] },
    { fn: step2CheckOriginalNickname, params: [user.nickname] },
    { fn: step3CheckOriginalEmail, params: [user.email] },
    { fn: step4HashPassword, params: [user.password] },
    { fn: step5CreateUser, params: [user] },
    { fn: step6CreateToken, params: [] },
    { fn: step7SendApi, params: [], last: true }
  ];

  const stepsResults: StepsResultRegistration = {
    step4HashPassword: null,
    step5CreateUser: null,
    step6CreateToken: null
  }

  stepsIteration(stepsIter, res, stepsResults);
}

