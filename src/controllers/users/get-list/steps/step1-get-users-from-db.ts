import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                    limit: number, offset: number, stepsResults: StepsResultGetUsersList) => {
  getRowsList((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUsersFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, limit, offset);
}
