import { UserRegistrationRequest } from '../../registration/interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { updateRow } from '../../../common/steps/update-row';
import { UserDbEnum } from '../../../../enums/users-table/user-db.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { ErrorInterface } from '../../../../utils/errors/error.interface';

export const step6UpdateUser = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                user: UserRegistrationRequest, reqParamsId: string, stepsResults: StepsResultUpdateUser) => {
  let updateFieldStr = '';

  const addQueryFieldsPatch = (field: string | number[] | number, fieldName: string) => {
    if (field) {
      updateFieldStr += !updateFieldStr ? `${ fieldName } = '${ field }'` : `, ${ fieldName } = '${ field }'`;
    }
  }

  addQueryFieldsPatch(user.nickname, UserDbEnum.Nickname);
  addQueryFieldsPatch(user.email, UserDbEnum.Email);
  addQueryFieldsPatch(user.lastsName, UserDbEnum.LastsName);
  addQueryFieldsPatch(user.firsName, UserDbEnum.FirsName);
  addQueryFieldsPatch(user.serviceIds, UserDbEnum.ServiceIdsStr);
  addQueryFieldsPatch(user.cityIds, UserDbEnum.CityIdsStr);
  addQueryFieldsPatch(user.phone, UserDbEnum.Phone);
  addQueryFieldsPatch(user.gender, UserDbEnum.Gender);
  addQueryFieldsPatch(user.birthday, UserDbEnum.Birthday);
  addQueryFieldsPatch(user.avatar, UserDbEnum.Avatar);
  addQueryFieldsPatch(user.infoYourself, UserDbEnum.InfoYourself);

  updateRow((err, statusCode, result) => {
    if (!err) {
      console.log(stepsResults)
      stepsResults.step6UpdateUser = result
      callback(null, 200, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, updateFieldStr, UserDbEnum.Id, reqParamsId);
}
