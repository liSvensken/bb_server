import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { checkFieldAnotherTable } from '../../../common/steps/check-field-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/user-request.enum';

export const step4CheckServicesAnotherTable = (callback: (err: ErrorInterface, statusCode: number) => void,
                                               userRole: UserRole, userServiceIds: number[]) => {
  if (userRole === UserRoleType.MASTER && userServiceIds) {
    checkFieldAnotherTable(callback, TablesEnum.Services, userServiceIds, UserRequestEnum.ServiceIds);
  } else {
    callback(null, 200);
  }
}
