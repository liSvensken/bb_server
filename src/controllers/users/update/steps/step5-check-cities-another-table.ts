import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkFieldAnotherTable } from '../../../common/steps/check-field-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../enums/users-table/user-request.enum';

export  const step5CheckCitiesAnotherTable = (callback: (err: ErrorInterface, statusCode: number) => void,
                                              userCityIds: number[]) => {
  if (userCityIds) {
    checkFieldAnotherTable(callback, TablesEnum.Cities, userCityIds, UserRequestEnum.CityIds);
  } else {
    callback(null, 200);
  }
}
