import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { ServiceModel } from '../../models/service.model';
import { MysqlError } from 'mysql';
import { UserPostResponse } from '../../interfaces/api/user-post-response.interface';
import { CityModel } from '../../models/city.model';
import { UserRole } from '../../enums/user-role';
import { apiSend } from '../../utils/api/api';
import { UserPostRequest } from '../../interfaces/api/user-post-request.interface';
import { UserModel } from '../../models/user.model';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { checkValidatorsAll, Validators } from '../../utils/validators/api-validators';
import { ValidatorFnType, ValidatorType } from '../../utils/validators/types/validators-types';
import { ValidatorInterface } from '../../utils/validators/interfaces/validator.interface';
import { UserGender } from '../../enums/user-gender';

export function userPostController(req: Request, res: Response) {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let user: UserPostRequest = req.body;

  const getServicesQuery = (callback: (err: MysqlError | null, result: ServiceModel[]) => void, servicesQuery: string) => {
    connection.query(`SELECT * FROM timetable.services WHERE ${ servicesQuery }`,
        (err, result: ServiceModel[]) => {
          callback(err, result);
        });
  }

  const getOriginalUsersQuery = (callback: (err: MysqlError | null, result: UserModel[]) => void, fieldsQuery: string) => {
    connection.query(`SELECT * FROM timetable.users WHERE ${ fieldsQuery }`,
        (err, result: UserModel[]) => {
          callback(err, result);
        });
  }

  const createUserQuery = (callback: (err: MysqlError | null, result: any) => void, services: ServiceModel[] | null) => {
    connection.query(`INSERT INTO timetable.users(role, services, name, email) VALUES
    ('${ user.role }', '${ JSON.stringify(user.services) }', '${ user.name }', '${ user.email }')`,
        (err, result: any) => {
          callback(err, result);
        })
  }

  const step1CheckValidForm = (callback: (err: any, statusCode: number) => void) => {
    let isValid: boolean;

    if (UserRole[user.role as UserRole]) {
      const validations: ValidatorInterface[] = [
        {
          key: 'role',
          value: user.role,
          validators: [Validators.required]
        },
        {
          key: 'nickname',
          value: user.nickname,
          validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
        },
        {
          key: 'email',
          value: user.email,
          validators: [Validators.required, Validators.minLength(5), Validators.maxLength(255)]
        },
        {
          key: 'lastsName',
          value: user.lastsName,
          validators: [Validators.minLength(2), Validators.maxLength(45)]
        },
        {
          key: 'firsName',
          value: user.firsName,
          validators: [Validators.minLength(2), Validators.maxLength(45)]
        },
        {
          key: 'serviceIds',
          value: user.serviceIds,
          validators: [Validators.maxLength(3)]
        },
        {
          key: 'cityId',
          value: user.cityId,
          validators: [Validators.maxLength(1)]
        },
        {
          key: 'phone',
          value: user.phone,
          validators: [Validators.maxLength(20)]
        },
        {
          key: 'birthday',
          value: user.phone,
          validators: [Validators.maxLength(10)]
        },
        {
          key: 'avatar',
          value: user.phone,
          validators: [Validators.maxLength(255)]
        },
        {
          key: 'infoYourself',
          value: user.phone,
          validators: [Validators.maxLength(3000)]
        },
      ];

      if (user.gender && !(UserGender[user.gender as UserGender])) {
        isValid = false;
      }

      isValid = checkValidatorsAll(validations, error);
      if (!isValid) {
        callback(error, error.status);
      }
    }
  }

  const step2CheckOriginalityUser = (callback: (err: any, statusCode: number) => void) => {
    getOriginalUsersQuery((err, result) => {
      if (!err) {
        console.log(123)
      }
    }, `nickname='${ user.nickname }' OR email='${ user.email }'`)

    callback(null, 413);
  }

  const step3CheckAndFillServices = (callback: (err: any) => void) => {
    if (user.role === UserRole.Master) {

      if (user.services) {
        let servicesQuery = '';

        Object.keys(user.services).forEach(elem => {
          if (!servicesQuery) {
            servicesQuery = `id = ${ user.services[elem] }`;
          } else {
            servicesQuery += ` OR id = ${ user.services[elem] }`
          }
        });

        getServicesQuery((err, result) => {
          if (!err) {
            if (result.length === user.services.length) {
              user.services = result;
              callback(null);
            } else {
              callback('Invalid services data');
            }
          } else {
            callback(err);
          }
        }, servicesQuery)
      }
    }
  }

  const step4CheckAndFillCity = (callback: (err: any) => void) => {
    let city: CityModel;
    callback(null);
  }

  const step5CreateUser = (callback: (err: any, result?: any) => void) => {
    createUserQuery((err, result) => {
      if (!err) {
        callback(null, result);
      } else {
        callback(err);
      }
    }, user.services)
  }

  step1CheckValidForm((err, statusCode) => {
    if (!err) {
      step2CheckOriginalityUser((err, statusCode) => {
        if (!err) {
          step3CheckAndFillServices(err => {
            if (!err) {
              step4CheckAndFillCity(err => {
                if (!err) {
                  step5CreateUser((err, result) => {
                    if (!err) {
                      apiSend(res, 200, result, null);
                    } else {
                      apiSend(res, 400, null, err);
                    }
                  })
                } else {
                  apiSend(res, 400, null, err);
                }
              })
            } else {
              apiSend(res, 400, null, err);
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

