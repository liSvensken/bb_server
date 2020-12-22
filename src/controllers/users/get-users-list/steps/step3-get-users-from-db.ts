import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { StepsResultGetUsersList } from '../interfaces/steps-result-get-users-list.interface';
import { isUsersDb } from '../../../../models/user/check-is-models/check-is-users-db';
import { getRowsByField } from '../../../common/steps/get-rows-by-field';
import { UserDbEnum } from '../../../../enums/users/user-db.enum';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { GetUsersListRequest } from '../interfaces/get-users-list-request.interface';
import { QueryFieldInterface } from '../interfaces/query-field.interface';
import { QueryMatchesInterface } from '../interfaces/query-matches.interface';
import { QueryMatchesArray } from '../interfaces/query-matches-array';

export const step3GetUsersFromDb = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUsersList, notFound?: boolean) => void,
                                    reqBody: GetUsersListRequest, stepsResults: StepsResultGetUsersList) => {

  const myClientIdsStr = stepsResults.step2GetCurrentUserFromDb.myClientIdsStr;
  const myMasterIdsStr = stepsResults.step2GetCurrentUserFromDb.myMasterIdsStr;

  // если запрос на only myMasters/myClients, но их нет у User-а, то сразу отдаем null UsersList;
  if (reqBody.onlyMy && !(myClientIdsStr || myMasterIdsStr)) {
    callback(null, 201, stepsResults)
  } else {

    // ищем совпадения по полям (role = 'CLIENT' или  id(myMasters) = [1,2])
    let queryField: QueryFieldInterface = {
      [UserDbEnum.Role]: null,
      [UserDbEnum.Id]: null,
      [UserDbEnum.CityId]: null
    }

    // ищем совпадения по частям строки (как при input вводе)
    let queryMatches: QueryMatchesInterface = {
      [UserDbEnum.Nickname]: null,
      [UserDbEnum.LastsName]: null,
      [UserDbEnum.FirsName]: null
    }

    // ищем совпадения по полям и значениям из масива, которые в DB вяглядят так: '[1,2]'
    let queryMatchesArray: QueryMatchesArray = {
      [UserDbEnum.ServiceIdsStr]: null
    }

    switch (stepsResults.step2GetCurrentUserFromDb.role) {
      case UserRoleType.MASTER:
        queryField[UserDbEnum.Role] = UserRoleType.CLIENT;
        if (reqBody.onlyMy && myClientIdsStr) {
          queryField[UserDbEnum.Id] = JSON.parse(stepsResults.step2GetCurrentUserFromDb.myClientIdsStr);
        }
        break;

      case UserRoleType.CLIENT:
        queryField[UserDbEnum.Role] = UserRoleType.MASTER;
        if (reqBody.onlyMy && myMasterIdsStr) {
          queryField[UserDbEnum.Id] = JSON.parse(stepsResults.step2GetCurrentUserFromDb.myMasterIdsStr);
        }
        break;
    }

    if (reqBody.query) {
      queryMatches[UserDbEnum.Nickname] = reqBody.query;
      queryMatches[UserDbEnum.LastsName] = reqBody.query;
      queryMatches[UserDbEnum.FirsName] = reqBody.query;
    }
    if (reqBody.city) {
      queryField[UserDbEnum.CityId] = reqBody.city;
    }
    if (reqBody.service) {
      queryMatchesArray[UserDbEnum.ServiceIdsStr] = reqBody.service;
    }

    getRowsByField((err, statusCode, result, notFound) => {
      if (notFound) {
        callback(null, 200, null, notFound);
      } else if (!err && isUsersDb(result)) {
        stepsResults.step3GetUsersFromDb = result;
        callback(null, 200, stepsResults);
      } else {
        callback(err, statusCode, null);
      }
    }, TablesEnum.Users, reqBody.limit, reqBody.offset, queryField, queryMatches, queryMatchesArray);
  }
}
