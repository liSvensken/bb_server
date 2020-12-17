import { UserRegistrationRequest } from '../../registration/interfaces/user-registration-request.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { updateRow } from '../../../common/steps/update-row';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';
import { ErrorInterface } from '../../../../utils/errors/error.interface';

export const step7UpdateUser = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                user: UserRegistrationRequest, stepsResults: StepsResultUpdateUser) => {

  const id = stepsResults.step1GetUserIdByToken;

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
  addQueryFieldsPatch(user.cityId, UserDbEnum.CityId);
  addQueryFieldsPatch(user.phone, UserDbEnum.Phone);
  addQueryFieldsPatch(user.gender, UserDbEnum.Gender);
  addQueryFieldsPatch(user.birthday, UserDbEnum.Birthday);
  addQueryFieldsPatch(user.avatar, UserDbEnum.Avatar);
  addQueryFieldsPatch(user.infoYourself, UserDbEnum.InfoYourself);

  updateRow((err, statusCode) => {
    if (!err) {
      callback(null, statusCode, stepsResults);
    } else {
      callback(err, statusCode, null);
    }
  }, TablesEnum.Users, updateFieldStr, UserDbEnum.Id, id);
}
