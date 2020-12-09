import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { checkFieldsAnotherTable } from '../../../common/steps/check-fields-another-table';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { UserDbEnum } from '../../../../enums/users-table/user-request.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';

export  const step5CheckCitiesAnotherTable = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                              userCityIds: number[], stepsResults: StepsResultRegistration) => {
  if (userCityIds) {
    checkFieldsAnotherTable((err, statusCode) => {
      if (!err) {
        callback(null, 200, stepsResults);
      } else{
        callback(err, statusCode, null);
      }
    }, TablesEnum.Cities, userCityIds, CitiesDbEnum.Id, UserDbEnum.CityIds);
  } else {
    callback(null, 200, null);
  }
}
