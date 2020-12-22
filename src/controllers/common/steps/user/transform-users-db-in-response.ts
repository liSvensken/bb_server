import { UserResponseModel } from '../../../../models/user/user-response.model';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';

export const transformUsersDbInResponse = (callback: (usersResponse: UserResponseModel[]) => void,
                                           role: UserRole, userDb: UserDbModel[]) => {
  let usersResponse: UserResponseModel[] = [];

  userDb.forEach((elem) => {
    let user: UserResponseModel = {
      id: elem.id ? elem.id : null,
      role: elem.role ? elem.role : null,
      nickname: elem.nickname ? elem.nickname : null,
      email: elem.email ? elem.email : null,
      city: elem.cityId ? { id: 0, name: '' } : null,
      lastsName: elem.lastsName ? elem.lastsName : null,
      firsName: elem.firsName ? elem.firsName : null,
      phone: elem.phone ? elem.phone : null,
      gender: elem.gender ? elem.gender : null,
      birthday: elem.birthday ? elem.birthday : null,
      avatar: elem.avatar ? elem.avatar : null,
      infoYourself: elem.infoYourself ? elem.infoYourself : null,
    };

    if (role ===  UserRoleType.MASTER) {
      user.services = elem.serviceIdsStr ? [] : null;
    }

    usersResponse.push(user);
  })
  callback(usersResponse);
}
