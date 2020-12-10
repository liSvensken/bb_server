import { UserResponseModel } from '../../../../models/user/user-response.model';
import { UserDbModel } from '../../../../models/user/user-db.model';

export const parseUsersInResponse = (callback: (usersResponse: UserResponseModel[]) => void,
                                     userDb: UserDbModel[]) => {
  let usersResponse: UserResponseModel[] = [];

  userDb.forEach((elem) => {
    const user: UserResponseModel = {
      id: elem.id ? elem.id : null,
      role: elem.role ? elem.role : null,
      nickname: elem.nickname ? elem.nickname : null,
      email: elem.email ? elem.email : null,
      services: elem.serviceIdsStr ? [] : null,
      cities: elem.cityIdsStr ? [] : null,
      lastsName: elem.lastsName ? elem.lastsName : null,
      firsName: elem.firsName ? elem.firsName : null,
      phone: elem.phone ? elem.phone : null,
      gender: elem.gender ? elem.gender : null,
      birthday: elem.birthday ? elem.birthday : null,
      avatar: elem.avatar ? elem.avatar : null,
      infoYourself: elem.infoYourself ? elem.infoYourself : null,
    };
    usersResponse.push(user);
  })
  callback(usersResponse);
}
