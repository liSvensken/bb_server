import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { ServiceModel } from '../../models/service.model';
import { MysqlError } from 'mysql';
import { UserRole } from '../../enums/user.role';
import { apiSend } from '../../utils/api/api';
import { UserPostRequest } from '../../interfaces/api/user-post-request.interface';
import { UserModel } from '../../models/user.model';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { checkValidatorsAll, Validators } from '../../utils/validators/api-validators';
import { ValidatorInterface } from '../../utils/validators/interfaces/validator.interface';
import { UserGender } from '../../enums/user.gender';
import { ErrorTypes } from '../../utils/api/enums/error-types.enum';
import { emailReg, nicknameReg, phoneReg } from '../../utils/regulars';
import { UserFieldsLength } from '../../utils/validators/enums/user-fields-length';
import { queryCreateRow, queryGetRowOnField } from '../../services/querys.services';
import { checkFieldAnotherTable, checkOriginalOnField } from './common-functions';

export function userPostController(req: Request, res: Response) {
  console.log('_________________________')
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let user: UserPostRequest = req.body;

  // const getQuery = (callback: (err: MysqlError | null, result: ServiceModel[]) => void, field: string, query: string) => {
  //   console.log(`SELECT * FROM timetable.${ field } WHERE ${ query }`)
  //   connection.query(`SELECT * FROM timetable.${ field } WHERE ${ query }`,
  //       (err, result: ServiceModel[]) => {
  //         callback(err, result);
  //       });
  // }
  //
  // const getDuplicateUsersQuery = (callback: (err: MysqlError | null, result: UserModel[]) => void,
  //                                 queryForOriginality: string) => {
  //   connection.query(`SELECT * FROM timetable.users WHERE ${ queryForOriginality }`,
  //       (err, result: UserModel[]) => {
  //         callback(err, result);
  //       });
  // }

  // const createUserQuery = (callback: (err: MysqlError | null, result: any) => void, values: string) => {
  //   connection.query(`
  //   INSERT INTO timetable.users(
  //   role, nickname, email, lastsName, firsName, serviceIds, cityId, phone, gender, birthday, avatar, infoYourself)
  //   VALUES (${ values })`,
  //       (err, result: any) => {
  //         callback(err, result);
  //       })
  // }

  const step1CheckValidForm = (callback: (err: any, statusCode: number) => void) => {
    const validations: ValidatorInterface[] = [
      {
        key: 'role',
        value: user.role,
        validators: [Validators.required, Validators.matchEnum(UserRole)]
      },
      {
        key: 'nickname',
        value: user.nickname,
        validators: [Validators.required, Validators.minLength(UserFieldsLength.nickname.min),
          Validators.maxLength(UserFieldsLength.nickname.max), Validators.regular(nicknameReg)]
      },
      {
        key: 'email',
        value: user.email,
        validators: [Validators.required, Validators.minLength(UserFieldsLength.email.min),
          Validators.maxLength(UserFieldsLength.email.max), Validators.regular(emailReg)]
      },
      {
        key: 'lastsName',
        value: user.lastsName,
        validators: [Validators.minLength(UserFieldsLength.lastsName.min),
          Validators.maxLength(UserFieldsLength.lastsName.max)]
      },
      {
        key: 'firsName',
        value: user.firsName,
        validators: [Validators.minLength(UserFieldsLength.firsName.min),
          Validators.maxLength(UserFieldsLength.firsName.max)]
      },
      {
        key: 'serviceIds',
        value: user.serviceIds,
        validators: [Validators.maxLength(UserFieldsLength.serviceIds.max)]
      },
      {
        key: 'cityId',
        value: user.cityId,
        validators: [Validators.maxLength(UserFieldsLength.cityId.max)]
      },
      {
        key: 'phone',
        value: user.phone,
        validators: [Validators.regular(phoneReg)]
      },
      {
        key: 'gender',
        value: user.gender,
        validators: [Validators.matchEnum(UserGender)]
      },
      {
        key: 'birthday',
        value: user.phone,
        validators: [Validators.maxLength(UserFieldsLength.birthday.max)]
      },
      {
        key: 'avatar',
        value: user.phone,
        validators: [Validators.maxLength(UserFieldsLength.avatar.max)]
      },
      {
        key: 'infoYourself',
        value: user.phone,
        validators: [Validators.maxLength(UserFieldsLength.infoYourself.max)]
      },
    ];

    const isValid = checkValidatorsAll(validations, error);
    if (!isValid) {
      callback(error, error.status);
    } else {
      callback(null, 200);
    }
  }

  const step2CheckOriginalNickname = (callback: (err: any, statusCode: number) => void) => {
    checkOriginalOnField(callback, 'users', user.nickname, 'nickname');
  }

  const step2CheckOriginalEmail = (callback: (err: any, statusCode: number) => void) => {
    checkOriginalOnField(callback, 'users', user.email, 'email');
  }

  // const step2CheckOriginalNickname = (callback: (err: any, statusCode: number) => void) => {
  //   queryGetRowOnField((err, result) => {
  //     switch (true) {
  //       case !!(err):
  //         error.type = ErrorTypes.SqlError;
  //         error.message = err.message;
  //         error.status = 500;
  //         callback(error, error.status);
  //         break;
  //
  //       case (!!Object.keys(result).length):
  //         error.type = ErrorTypes.InvalidParam;
  //         error.field = user.nickname;
  //         error.message = `user with field "${ error.field }" already exists`;
  //         error.status = 403;
  //         callback(error, error.status);
  //         break;
  //
  //       default:
  //         callback(null, 200);
  //     }
  //   }, 'users', `nickname='${ user.nickname }'`);
  // }

  // const  = (callback: (err: any, statusCode: number) => void) => {
  //   queryGetRowOnField((err, result) => {
  //     switch (true) {
  //       case !!(err):
  //         error.type = ErrorTypes.SqlError;
  //         error.message = err.message;
  //         error.status = 500;
  //         callback(error, error.status);
  //         break;
  //
  //       case !!(!!Object.keys(result).length):
  //         error.type = ErrorTypes.InvalidParam;
  //         error.field = user.email;
  //         error.message = `user with field "${ error.field }" already exists`;
  //         error.status = 403;
  //         callback(error, error.status);
  //         break;
  //
  //       default:
  //         callback(null, 200);
  //     }
  //   }, 'users', `email='${ user.email }'`);
  // }

  const step3CheckServicesFromDatabase = (callback: (err: any, statusCode: number) => void) => {
    if (user.role === UserRole.MASTER) {
      let servicesQuery = '';
      user.serviceIds.forEach(elem => {
        if (!servicesQuery) {
          servicesQuery = `id = ${ elem }`;
        } else {
          servicesQuery += ` OR id = ${ elem }`
        }
      })
      checkFieldAnotherTable(callback, 'services', user.serviceIds, 'servicesIds', servicesQuery);
    }
  }

  const step3CheckCitiesFromDatabase = (callback: (err: any, statusCode: number) => void) => {
    if (user.cityId) {
      checkFieldAnotherTable(callback, 'cities', user.cityId, 'cityId', `id = ${ user.cityId }`);
    }
  }

  // const step3CheckServicesFromDatabase = (callback: (err: any, statusCode: number) => void) => {
  //   // сверяем с DB services
  //   if (user.role === UserRole.MASTER && user.serviceIds) {
  //     let servicesQuery = '';
  //     user.serviceIds.forEach(elem => {
  //       if (!servicesQuery) {
  //         servicesQuery = `id = ${ elem }`;
  //       } else {
  //         servicesQuery += ` OR id = ${ elem }`
  //       }
  //     })
  //
  //     queryGetRowOnField((err, result) => {
  //       if (err) {
  //         error.type = ErrorTypes.SqlError;
  //         error.message = err.message;
  //         error.status = 500;
  //         callback(error, error.status);
  //       } else if (result.length !== user.serviceIds.length) {
  //         error.type = ErrorTypes.InvalidParam;
  //         error.field = 'servicesIds';
  //         error.message = `Еhe selected values for the "${ error.field }" field do not exist`;
  //         error.status = 403;
  //         callback(error, error.status);
  //       } else {
  //         callback(null, 200);
  //       }
  //     }, 'services', servicesQuery);
  //   }
  // }

  // const step3CheckCitiesFromDatabase = (callback: (err: any, statusCode: number) => void) => {
  //   // сверяем с DB cities
  //   if (user.cityId) {
  //     queryGetRowOnField((err, result) => {
  //       if (err) {
  //         error.type = ErrorTypes.SqlError;
  //         error.message = err.message;
  //         error.status = 500;
  //         callback(error, error.status);
  //       } else if (result.length !== user.cityId.length) {
  //         error.type = ErrorTypes.InvalidParam;
  //         error.field = 'cityId';
  //         error.message = `Еhe selected values for the "${ error.field }" field do not exist`;
  //         error.status = 404;
  //         callback(error, error.status);
  //       } else {
  //         callback(null, 200);
  //       }
  //     }, 'cities', `id = ${ user.cityId }`)
  //   }
  // }

  const step4CreateUser = (callback: (err: any, statusCode: number, result?: any) => void) => {
    let valueQuery = `'${ user.role }', '${ user.nickname }', '${ user.email }'`;

    const addValueQueryOptionalField = (field: any) => {
      valueQuery += field ? `, '${ field }'` : `, ${ null }`;
    }
    addValueQueryOptionalField(user.lastsName);
    addValueQueryOptionalField(user.firsName);
    addValueQueryOptionalField(user.serviceIds);
    addValueQueryOptionalField(user.cityId);
    addValueQueryOptionalField(user.phone);
    addValueQueryOptionalField(user.gender);
    addValueQueryOptionalField(user.birthday);
    addValueQueryOptionalField(user.avatar);
    addValueQueryOptionalField(user.infoYourself);

    queryCreateRow((err, result) => {
      if (!err) {
        callback(null, null, result);
      } else {
        error.type = ErrorTypes.SqlError;
        error.message = err.message;
        error.status = 500;
        callback(err, error.status);
      }
    }, 'users',
        'role, nickname, email, lastsName, firsName, serviceIds, cityId, phone, gender, birthday, avatar, infoYourself',
        valueQuery)
  }

  step1CheckValidForm((err, statusCode) => {
    if (!err) {
      step2CheckOriginalNickname((err, statusCode) => {
        if (!err) {
          step2CheckOriginalEmail((err, statusCode) => {
            if (!err) {
              step3CheckServicesFromDatabase((err, statusCode) => {
                if (!err) {
                  step3CheckCitiesFromDatabase((err, statusCode) => {
                    if (!err) {
                      step4CreateUser((err, statusCode, result) => {
                        if (!err) {
                          apiSend(res, 200, result, null);
                        } else {
                          apiSend(res, statusCode, null, err);
                        }
                      })
                    } else {
                      apiSend(res, statusCode, null, err);
                    }
                  })
                } else {
                  apiSend(res, statusCode, null, err);
                }
              })
            } else {
              apiSend(res, statusCode, null, err);
            }
          })
        } else {
          apiSend(res, statusCode, null, err);
        }
      });
    } else {
      apiSend(res, statusCode, null, err);
    }
  });
}

