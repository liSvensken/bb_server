import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultGetClientsList } from '../interfaces/steps-clients-get-users-list.interface';
import { countRowsByFieldValue } from '../../../common/steps/count-rows-by-field-value';
import { UserRoleType } from '../../../../types/user-role.type';

export const step6GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetClientsList) => void,
                                   stepsResults: StepsResultGetClientsList) => {
  countRowsByFieldValue((err, statusCode, result) => {
    if (!err) {
      stepsResults.step5GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserRoleType.CLIENT, UserDbEnum.Role);
}
