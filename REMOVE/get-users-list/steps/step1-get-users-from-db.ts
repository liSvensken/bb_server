import { ErrorInterface } from '../../../src/utils/errors/error.interface';
import { getRowsLimit } from '../../../src/controllers/common/steps/get-rows-limit';
import { TablesEnum } from '../../../src/enums/tables-name.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { isUsersDb } from '../../../src/models/user/check-is-models/check-is-users-db';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                    limit: number, offset: number, stepsResults: StepsResultGetUsersList) => {
  getRowsLimit((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step1GetUsersFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, limit, offset);
}
