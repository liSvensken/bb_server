import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResult } from '../interfaces/steps-result';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';

export const step4ParseCitiesInResponse = (callback: (err: ErrorInterface, statusCode: number, stepsResults?: StepsResult) => void,
                                             stepsResults: StepsResult) => {
  stepsResults.step1GetUsersFromDb.forEach((userDb, idx) => {
    if (userDb.cityIdsStr) {
      const cityIds: number = JSON.parse(userDb.cityIdsStr);
      getRowByField((err, statusCode, result) => {
        if (!err) {
          stepsResults.step2ParseUsersInResponse[idx].cities = result;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Cities, cityIds, CitiesDbEnum.Id)
    }
  })
}
