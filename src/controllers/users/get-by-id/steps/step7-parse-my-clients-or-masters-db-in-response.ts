import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseMySubscriber } from '../../../common/steps/user/RESET-parse-clients-or-masters/parse-my-subscriber';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';
import { getSubscribersListFromUsersList } from '../../../common/steps/user/RESET-parse-clients-or-masters/get-subscribers-list-from-users-list';

export const step7ParseMyClientsOrMastersDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                                         stepsResults: StepsResultGetUser) => {
  const role = stepsResults.step4TransformUserDbInResponse[0].role;

  getSubscribersListFromUsersList((err, statusCode, userRes) => {
    if (!err) {
      stepsResults.step4TransformUserDbInResponse = userRes;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, role, stepsResults.step2GetUserFromDb, stepsResults.step4TransformUserDbInResponse);
}
