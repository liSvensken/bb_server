import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { StepsResult } from '../interfaces/steps-result';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export const step2ParseUsersInResponse = (callback: (err: ErrorInterface, statusCode: number, stepsResults?: StepsResult) => void,
                                          stepsResults: StepsResult) => {
  let usersResponse: UserResponseModel[] = [];

  stepsResults.step1GetUsersFromDb.forEach((userDb) => {
    const user: UserResponseModel = {
      id: userDb.id ? userDb.id : null,
      role: userDb.role ? userDb.role : null,
      nickname: userDb.nickname ? userDb.nickname : null,
      email: userDb.email ? userDb.email : null,
      services: userDb.serviceIdsStr ? [] : null,
      cities: userDb.cityIdsStr ? [] : null,
      lastsName: userDb.lastsName ? userDb.lastsName : null,
      firsName: userDb.firsName ? userDb.firsName : null,
      phone: userDb.phone ? userDb.phone : null,
      gender: userDb.gender ? userDb.gender : null,
      birthday: userDb.birthday ? userDb.birthday : null,
      avatar: userDb.avatar ? userDb.avatar : null,
      infoYourself: userDb.infoYourself ? userDb.infoYourself : null,
    };
    usersResponse.push(user);
  })

  stepsResults.step2ParseUsersInResponse = usersResponse;
  callback(null, 200, stepsResults);
}
