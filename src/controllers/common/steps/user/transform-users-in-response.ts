import { UserResponseModel } from '../../../../models/user/user-response.model';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserRoleType } from '../../../../types/user-role.type';

export const transformUsersInResponse = (callback: (usersResponse: UserResponseModel[]) => void,
                                         userDb: UserDbModel[]) => {
  let usersResponse: UserResponseModel[] = [];

  userDb.forEach((elem) => {
    let user: UserResponseModel = {
      id: elem.id ? elem.id : null,
      role: elem.role ? elem.role : null,
      nickname: elem.nickname ? elem.nickname : null,
      email: elem.email ? elem.email : null,
      cities: elem.cityIdsStr ? [] : null,
      lastsName: elem.lastsName ? elem.lastsName : null,
      firsName: elem.firsName ? elem.firsName : null,
      phone: elem.phone ? elem.phone : null,
      gender: elem.gender ? elem.gender : null,
      birthday: elem.birthday ? elem.birthday : null,
      avatar: elem.avatar ? elem.avatar : null,
      infoYourself: elem.infoYourself ? elem.infoYourself : null,
    };

    if (user.role === UserRoleType.MASTER) {
      user.services = elem.serviceIdsStr ? [] : null;
      user.myClients = elem.myClientIdsStr ? [] : null;
    }

    if (user.role === UserRoleType.CLIENT) {
      user.myMasters = elem.myMasterIdsStr ? [] : null;
    }

    usersResponse.push(user);
  })
  callback(usersResponse);
}
