import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { UserResponseModel } from '../../../../../models/user/user-response.model';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { parseCityFromUser } from './parse-city-from-user';

export const parseCityFromUsersList = (callback: (err: ErrorInterface, statusCode: number, stepsResults: UserResponseModel[]) => void,
                                       usersDb: UserDbModel[], usersResponse: UserResponseModel[]) => {

  // вместо синхронного forEach (1 итерация - 1 User)
  const userDbIteration = (userDbValues: IterableIterator<UserDbModel>) => {
    const userDb = userDbValues.next().value;
    numIterUsers++;

    switch (true) {
      case !!(userDb.cityId): // у юзера есть город
        parseCityFromUser((err, statusCode, result) => {
          if (!err) {
            usersResponse[numIterUsers - 1].city = result;
            if (numIterUsers < usersDb.length) { // ... и это НЕпоследня итерация по User's
              userDbIteration(userDbValues);
            } else {
              callback(null, 200, usersResponse); // ... и это последня итерация по User's
            }
          } else {
            callback(err, statusCode, null); // Ошибка SQL запроса
          }
        }, userDb.cityId)
        break;

      case numIterUsers < usersDb.length: // у юзера нет города, но это НЕпоследня итерация по User's
        userDbIteration(userDbValues);
        break;

      case numIterUsers === usersDb.length: // у юзера нет города и это последня итерация по User's
        callback(null, 200, usersResponse);
        break;
    }
  }

  let numIterUsers = 0;
  const userDbValues = usersDb.values();
  userDbIteration(userDbValues);
}
