import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../../models/user/user-response.model';
import { parseServicesFromUser } from './parse-services-from-user';
import { UserRole, UserRoleType } from '../../../../../types/user-role.type';

export const parseServicesFromUsersList = (callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
                                           usersDb: UserDbModel[], usersResponse: UserResponseModel[], role?: UserRole) => {

  if (role === UserRoleType.CLIENT) {
    callback(null, 200, usersResponse);
  } else {
    // вместо синхронного forEach (1 итерация - 1 User)
    const userDbIteration = (userDbValues: IterableIterator<UserDbModel>) => {
      const userDb = userDbValues.next().value;
      numIterUsers++;

      switch (true) {
        case !!(userDb.serviceIdsStr): // у юзера есть сервисы
          const serviceIds: number[] = JSON.parse(userDb.serviceIdsStr);
          parseServicesFromUser((err, statusCode, result) => {
            if (!err) {
              usersResponse[numIterUsers - 1].services = result;
              if (numIterUsers < usersDb.length) { // ... и это НЕпоследня итерация по User's
                userDbIteration(userDbValues);
              } else {
                callback(null, 200, usersResponse); // ... и это последня итерация по User's
              }
            } else {
              callback(err, statusCode, null); // Ошибка SQL запроса
            }
          }, serviceIds)
          break;

        case numIterUsers < usersDb.length: // у юзера нет сервисов, но это НЕпоследня итерация по User's
          userDbIteration(userDbValues);
          break;

        case numIterUsers === usersDb.length: // у юзера нет сервисов и это последня итерация по User's
          callback(null, 200, usersResponse);
          break;
      }
    }

    let numIterUsers = 0;
    const userDbValues = usersDb.values();
    userDbIteration(userDbValues);
  }
}
