import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResultGetUserByToken } from '../interfaces/steps-result-get-user-by-token.interface';
import { getSubscribersListFromUsersList } from '../../../common/steps/user/parse-clients-or-masters/get-subscribers-list-from-users-list';

export const step6ParseMyClientsOrMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUserByToken) => void,
                                                         stepsResults: StepsResultGetUserByToken) => {
  const role = stepsResults.step3TransformUserDbInResponse[0].role;

  getSubscribersListFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step3TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step3TransformUserDbInResponse);
}
