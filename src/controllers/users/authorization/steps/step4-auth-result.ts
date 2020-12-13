import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';

export const step4AuthResult = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                stepsResults: StepsResultAuthorization) => {
  stepsResults.step4AuthResult = {
    id: stepsResults.step1GetUserFromDb.id,
    role: stepsResults.step1GetUserFromDb.role,
    nickname: stepsResults.step1GetUserFromDb.nickname
  }

  callback(null, 200, stepsResults);
}
