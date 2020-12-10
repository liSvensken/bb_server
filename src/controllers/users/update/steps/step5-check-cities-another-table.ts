import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkFieldsAnotherTable } from '../../../common/steps/check-fields-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-request.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';

export  const step5CheckCitiesAnotherTable = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                              userCityIds: number[], stepsResults: StepsResultUpdateUser) => {
  switch (true) {
    case !!(userCityIds):
      checkFieldsAnotherTable((err, statusCode) => {
        if (!err) {
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Cities, userCityIds, CitiesDbEnum.Id, UserDbEnum.CityIds);
      break;

    default:
      callback(null, 200, stepsResults);
      break;
  }
}
