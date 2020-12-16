import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { getRowsByFieldLimit } from '../../../common/steps/get-rows-by-field-limit';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { GetUsersListRequest } from '../interfaces/get-users-list-request.interface';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                    reqBody: GetUsersListRequest, stepsResults: StepsResultGetUsersList) => {
  getRowsByFieldLimit((err, statusCode, result) => {
    if (!err && isUsersDb(result)) {
      stepsResults.step1GetUsersFromDb = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, reqBody.role, UserDbEnum.Role, reqBody.limit, reqBody.offset);
}
