import { UserResponseModel } from '../../../../models/user/user-response.model';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { getRowsByField } from '../get-rows-by-field';
import { parseMySubscriberInResponse } from './parse-my-subscriber-in-response';

export const transformUsersDbInResponse = (callback: (usersResponse: UserResponseModel[]) => void,
                                           role: UserRole, userDb: UserDbModel[]) => {
  let usersResponse: UserResponseModel[] = [];

  userDb.forEach((elem) => {
    let user: UserResponseModel = {
      id: elem.id,
      role: elem.role,
      nickname: elem.nickname,
      email: elem.email,
      city: elem.cityId ? { id: 0, name: '' } : null,
      lastsName: elem.lastsName ? elem.lastsName : null,
      firsName: elem.firsName ? elem.firsName : null,
      phone: elem.phone ? elem.phone : null,
      gender: elem.gender ? elem.gender : null,
      birthday: elem.birthday ? elem.birthday : null,
      avatar: elem.avatar ? elem.avatar : null,
      infoYourself: elem.infoYourself ? elem.infoYourself : null,
    };

    switch (role) {
      case UserRoleType.MASTER:
        user.services = elem.serviceIdsStr ? [] : null;
        user.myClients = elem.myClientIdsStr ? [] : null;
          if (elem.myClientIdsStr) {
            const myClientId: number[] = JSON.parse(elem.myClientIdsStr);
            parseMySubscriberInResponse((err, statusCode, result) => {

            }, role, myClientId, user.myClients)
          }
        break;

      case UserRoleType.CLIENT:
        user.myMasters = elem.myMasterIdsStr ? [] : null;
        break;
    }

    usersResponse.push(user);
  })
  callback(usersResponse);
}
