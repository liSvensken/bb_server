import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';
import { getSubscribersListFromUsersList } from '../../../common/steps/user/parse-clients-or-masters/get-subscribers-list-from-users-list';

export const step7ParseMyClientsOrMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                                         stepsResults: StepsResultAuthorization) => {
  const role = stepsResults.step1GetUserFromDb[0].role;

  getSubscribersListFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step1GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
