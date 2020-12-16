import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { countRows } from '../../../common/steps/count-rows';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultGetMastersList } from '../interfaces/steps-result-get-masters-list.interface';
import { countRowsByFieldValue } from '../../../common/steps/count-rows-by-field-value';
import { UserRoleType } from '../../../../types/user-role.type';

export const step6GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetMastersList) => void,
                                   stepsResults: StepsResultGetMastersList) => {
  countRowsByFieldValue((err, statusCode, result) => {
    if (!err) {
      stepsResults.step6GetTotalItems = result;
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserRoleType.MASTER, UserDbEnum.Role);
}
