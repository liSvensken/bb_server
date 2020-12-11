import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkFieldsAnotherTable } from '../../../common/steps/check-fields-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users/user-request.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';
import { CitiesDbEnum } from '../../../../enums/cities/cities-db.enum';

export const step5CheckCitiesAnotherTable = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                             userCityIds: number[], stepsResults: StepsResultRegistration) => {

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
  }
}
