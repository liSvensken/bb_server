import { ErrorInterface } from '../../../utils/errors/error.interface';
import { ErrorTypes } from '../../../utils/errors/error.types';
import { UserDbModel } from '../../../models/user/user-db.model';
import { queryGetRowsByFieldLimit } from '../querys/query-get-rows-by-field-limit';
import { queryGetRowsByField } from '../querys/query-get-rows-by-field';
import { ServiceModel } from '../../../models/service/service.model';
import { CityModel } from '../../../models/city/city.model';
import { UserRole } from '../../../types/user-role.type';
import { UserGender } from '../../../types/user-gender.type';
import { QueryFieldInterface } from '../../users/get-users-list/interfaces/query-field.interface';
import { QueryMatchesInterface } from '../../users/get-users-list/interfaces/query-matches.interface';
import { QueryMatchesArray } from '../../users/get-users-list/interfaces/query-matches-array';

export const getRowsByField =
    (callback: (err: ErrorInterface, statusCode: number, result: UserDbModel[] | ServiceModel[] | CityModel[], notFound?: boolean) => void,
     table: string, limit: number, offset: number,
     queryField?: QueryFieldInterface | { [key: string]: number | number[] },
     queryMatches?: QueryMatchesInterface,
     queryMatchesArray?: QueryMatchesArray) => {

      let error: ErrorInterface = {
        type: '',
        field: '',
        message: '',
        status: 0,
      };

      let queryCondition = '';

      if (queryField) {
        // добавляем в запрос поля (н-р '... role = 'MASTER' AND (id = 245 OR id = 247)')
        Object.keys(queryField).forEach(fieldKey => {
          const fieldValue = queryField[fieldKey];
          // const fieldValue = (fieldKey: string) => (queryField: object) => queryField[fieldKey];
          if (fieldValue)
            switch (typeof fieldValue) {
                // Array (н-р, ... AND (id = 245 OR id = 247))
              case 'object':
                fieldValue.forEach((elem, i) => {
                  if (!queryCondition && !i) {
                    queryCondition = `(${ fieldKey } = ${ elem }`
                  } else if (queryCondition && !i) {
                    queryCondition += ` AND (${ fieldKey } = ${ elem }`
                  } else {
                    queryCondition += ` OR ${ fieldKey } = ${ elem }`
                  }
                  if (i === Object.keys(fieldValue).length - 1) {
                    queryCondition += ')'
                  }
                })
                break;

                // (н-р, ... AND role = 'MASTER')
              case 'string':
                queryCondition += !queryCondition ? `${ fieldKey } = '${ fieldValue }'` : `AND ${ fieldKey } = '${ fieldValue }'`;
                break;

                // (н-р ... AND cityIdsStr = 2)
              default:
                queryCondition += !queryCondition ? `${ fieldKey } = ${ fieldValue }` : `AND ${ fieldKey } = ${ fieldValue }`;
            }
        })
      }

      if (queryMatches) {
        // добавляем в запрос совпадения
        // (н-р, ... AND (nickname LIKE '%sd%' OR email LIKE '%sd%'))
        Object.keys(queryMatches).forEach((matchesKey, i) => {
          const matchesValue = queryMatches[matchesKey];
          if (matchesValue) {
            if (!queryCondition && !i) {
              queryCondition = `(${ matchesKey } LIKE '%${ matchesValue }%'`
            } else if (queryCondition && !i) {
              queryCondition += ` AND (${ matchesKey } LIKE '%${ matchesValue }%'`
            } else {
              queryCondition += ` OR ${ matchesKey } LIKE '%${ matchesValue }%'`
            }
            if (i === Object.keys(queryMatches).length - 1) {
              queryCondition += ')'
            }
          }
        })
      }

      if (queryMatchesArray) {
        // добавляем в запрос совпадения c массивани в DB
        // н-р, ... AND (serviceIdsStr LIKE '%[2,%' OR serviceIdsStr LIKE '%,2,%' OR serviceIdsStr LIKE '%,2]%');
        Object.keys(queryMatchesArray).forEach((matArrayKey, index) => {
          const val = queryMatchesArray[matArrayKey];
          if (val) {
            const matArrayValues = [`[${ val },%`, `%,${ val },%`, `%,${ val }]`];
            matArrayValues.forEach((value, i) => {
              if (!queryCondition && !i) {
                queryCondition = `(${ matArrayKey } LIKE '${ value }'`
              } else if (queryCondition && !i) {
                queryCondition += ` AND (${ matArrayKey } LIKE '${ value }'`
              } else {
                queryCondition += ` OR ${ matArrayKey } LIKE '${ value }'`
              }
              if (index === Object.keys(queryMatchesArray).length - 1 &&
                  i === matArrayValues.length - 1) {
                queryCondition += ')'
              }
            })
          }
        })
      }

      limit = limit ? limit : 9999;
      offset = offset ? offset : 0

      queryGetRowsByFieldLimit((err, result) => {
        if (!err) {
          if (result.length) {
            callback(null, 200, result, false);
          } else {
            callback(null, 200, result, true);
          }
        } else {
          error.type = ErrorTypes.InternalServerError;
          error.message = err.message;
          error.status = 500;
          callback(error, error.status, null);
        }
      }, table, queryCondition, limit, offset);
    };
