import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResult } from '../interfaces/steps-result';

export const step1GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, stepsResults?: StepsResult) => void,
                                    limit?: number, offset?: number, stepsResults?: StepsResult) => {
  getRowsList((err, statusCode, result) => {
    if (!err) {
      stepsResults.step1GetUsersFromDb = result;
      callback(null, 200, stepsResults);
    }
  }, TablesEnum.Users, limit, offset);
}
