import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { checkFieldsAnotherTable } from '../../../common/steps/check-fields-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';

export const step5CheckServicesAnotherTable = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                               userRole: UserRole, userServiceIds: number[], stepsResults: StepsResultUpdateUser) => {

  switch (true) {
    case userRole === UserRoleType.MASTER && !!(userServiceIds):
      checkFieldsAnotherTable((err, statusCode) => {
        if (!err) {
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Services, userServiceIds, ServicesDbEnum.Id, UserDbEnum.ServiceIdsStr);
      break;

    default:
      callback(null, 200, stepsResults);
  }
}
