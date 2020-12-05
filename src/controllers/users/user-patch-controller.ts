import { Request, Response } from 'express';
import { connection } from '../../services/db.service';
import { ErrorInterface } from '../../utils/api/interfaces/error.interface';
import { ErrorTypes } from '../../utils/api/enums/error-types.enum';
import { apiSend } from '../../utils/api/api';
import { UserPostRequest } from '../../interfaces/api/user-post-request.interface';
import { ValidatorInterface } from '../../utils/validators/interfaces/validator.interface';
import { checkValidatorsAll, Validators } from '../../utils/validators/api-validators';
import { UserRole } from '../../enums/user.role';
import { emailReg, nicknameReg, phoneReg } from '../../utils/regulars';
import { UserGender } from '../../enums/user.gender';
import { UserFieldsLength } from '../../utils/validators/enums/user-fields-length';
import { User } from '../../enums/user.enum';
import { MysqlError } from 'mysql';
import { queryPatchRowOnId } from '../../services/querys.services';

export function userPatchController(req: Request, res: Response) {
  console.log('_________________')
  let user: UserPostRequest = req.body;

  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  let fieldReplace = '';

  // const patchUserQuery = (callback: (err: MysqlError | null, result: any) => void, table: string, fieldReplace: string) => {
  //   connection.query(`UPDATE timetable.${ table } SET ${ fieldReplace } WHERE id = ${ req.params.id }`,
  //       (err, result: any) => {
  //         callback(err, result);
  //       })
  // }

  const step1CheckValidFor = (callback: (err: any, statusCode: number) => void) => {
    const validations: ValidatorInterface[] = [
      {
        key: 'nickname',
        value: user.nickname,
        validators: [Validators.minLength(UserFieldsLength.nickname.min),
          Validators.maxLength(UserFieldsLength.nickname.max), Validators.regular(nicknameReg)]
      },
      {
        key: 'email',
        value: user.email,
        validators: [Validators.minLength(UserFieldsLength.email.min),
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

  const step2CheckExistenceFields = (callback: (err: any, statusCode: number) => void) => {
    Object.keys(req.body).forEach(key => {
      if ((User[key as User])) {
        fieldReplace += !fieldReplace ? `${ key } = '${ req.body[key] }'` : `, ${ key } = '${ req.body[key] }'`;
        callback(null, 200);
      } else {
        error.type = ErrorTypes.RequestError;
        error.message = `field "${ key }" does not exist`;
        error.status = 404;
        callback(error, error.status);
      }
    })
  }

  const step4PatchUser = (callback: (err: any, statusCode: number, result?: any) => void) => {
    queryPatchRowOnId((err, result) => {
      switch (true) {
        case !!(err):
          error.type = ErrorTypes.SqlError;
          error.message = err.message;
          error.status = 500;
          callback(error, error.status);
          break;

        case (!result.affectedRows):
          error.type = ErrorTypes.InvalidParam;
          error.field = 'userId';
          error.message = `the "${ error.field }" field does not exist`;
          error.status = 404;
          callback(error, error.status);
          break;

        default:
          callback(null, null, result);
      }
    }, 'users', fieldReplace, req.params.id)
  }

  step1CheckValidFor((err, statusCode) => {
    if (!err) {
      step2CheckExistenceFields((err, statusCode) => {
        if (!err) {
          step4PatchUser((err, statusCode, result) => {
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
}


