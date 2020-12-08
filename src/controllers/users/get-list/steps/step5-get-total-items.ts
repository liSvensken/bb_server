import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getCountRowsByField } from '../../../common/steps/get-count-rows-by-field';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { StepsResult } from '../interfaces/steps-result';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export const step5GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, result?: UserResponseModel[], totalItems?: number) => void,
                                   stepsResults?: StepsResult) => {
  getCountRowsByField((err, statusCode, result) => {
    if (!err) {
      stepsResults.step5GetTotalItems = result;
      callback(null, 200, stepsResults.step2ParseUsersInResponse, stepsResults.step5GetTotalItems);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, UserDbEnum.Id);
}
