import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { countRows } from '../../../common/steps/count-rows';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { countRowsByFieldValue } from '../../../common/steps/count-rows-by-field-value';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const step7GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList) => void,
                                   role: UserRole, stepsResults: StepsResultGetUsersList) => {

  countRowsByFieldValue((err, statusCode, result) => {
    if (!err) {
      stepsResults.step6GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, role, UserDbEnum.Role);
}
