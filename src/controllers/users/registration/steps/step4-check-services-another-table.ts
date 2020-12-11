import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { checkFieldsAnotherTable } from '../../../common/steps/check-fields-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-request.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { ServicesDbEnum } from '../../../../enums/services/services-db.enum';

export const step4CheckServicesAnotherTable = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                               userRole: UserRole, userServiceIds: number[], stepsResults: StepsResultRegistration) => {

  switch (true) {
    case userRole === UserRoleType.MASTER && !!(userServiceIds):
      checkFieldsAnotherTable((err, statusCode) => {
        if (!err) {
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Services, userServiceIds, ServicesDbEnum.Id, UserDbEnum.ServiceIds);
      break;

    default:
      callback(null, 200, stepsResults);
  }
}
