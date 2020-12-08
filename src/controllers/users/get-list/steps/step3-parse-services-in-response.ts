import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResult } from '../interfaces/steps-result';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';

export const step3ParseServicesInResponse = (callback: (err: ErrorInterface, statusCode: number, stepsResults?: StepsResult) => void,
                                             stepsResults: StepsResult) => {
  stepsResults.step1GetUsersFromDb.forEach((userDb, idx) => {
    if (userDb.serviceIdsStr) {
      const serviceIds: number = JSON.parse(userDb.serviceIdsStr);
      getRowByField((err, statusCode, result) => {
        if (!err) {
          stepsResults.step2ParseUsersInResponse[idx].services = result;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, TablesEnum.Services, serviceIds, ServicesDbEnum.Id)
    }
  })
}
