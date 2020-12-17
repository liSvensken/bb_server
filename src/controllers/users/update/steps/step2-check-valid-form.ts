import { ValidatorInterface } from '../../../../utils/validators/interfaces/validator.interface';
import { checkValidatorsAll, Validators } from '../../../../utils/validators/api-validators';
import { UserFieldsLength } from '../../../../utils/validators/consts/user-fields-length';
import { emailReg, nicknameReg, phoneReg } from '../../../../utils/consts/regulars';
import { UserGenderType } from '../../../../types/user-gender.type';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRegistrationRequest } from '../../registration/interfaces/user-registration-request.interface';
import { UserRequestEnum } from '../../../../enums/users/user-request.enum';
import { StepsResultUpdateUser } from '../interfaces/steps-result-update-user.interface';

export const step2CheckValidForm = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultUpdateUser) => void,
                                    user: UserRegistrationRequest, stepsResults: StepsResultUpdateUser) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  const validations: ValidatorInterface[] = [
    {
      key: UserRequestEnum.Nickname,
      value: user.nickname,
      validators: [Validators.minLength(UserFieldsLength.nickname.min),
        Validators.maxLength(UserFieldsLength.nickname.max), Validators.regular(nicknameReg)]
    },
    {
      key: UserRequestEnum.Email,
      value: user.email,
      validators: [Validators.minLength(UserFieldsLength.email.min),
        Validators.maxLength(UserFieldsLength.email.max), Validators.regular(emailReg)]
    },
    {
      key: UserRequestEnum.Password,
      value: user.password,
      validators: [Validators.minLength(UserFieldsLength.password.min),
        Validators.maxLength(UserFieldsLength.password.max), Validators.regular(emailReg)]
    },
    {
      key: UserRequestEnum.LastsName,
      value: user.lastsName,
      validators: [Validators.minLength(UserFieldsLength.lastsName.min),
        Validators.maxLength(UserFieldsLength.lastsName.max)]
    },
    {
      key: UserRequestEnum.FirsName,
      value: user.firsName,
      validators: [Validators.minLength(UserFieldsLength.firsName.min),
        Validators.maxLength(UserFieldsLength.firsName.max)]
    },
    {
      key: UserRequestEnum.ServiceIds,
      value: user.serviceIds,
      validators: [Validators.maxLength(UserFieldsLength.serviceIds.max)]
    },
    {
      key: UserRequestEnum.CityId,
      value: user.cityId,
      validators: [Validators.maxLength(UserFieldsLength.cityIds.max)]
    },
    {
      key: UserRequestEnum.Phone,
      value: user.phone,
      validators: [Validators.regular(phoneReg)]
    },
    {
      key: UserRequestEnum.Gender,
      value: user.gender,
      validators: [Validators.matchEnum(UserGenderType)]
    },
    {
      key: UserRequestEnum.Birthday,
      value: user.birthday,
      validators: [Validators.maxLength(UserFieldsLength.birthday.max)]
    },
    {
      key: UserRequestEnum.Avatar,
      value: user.avatar,
      validators: [Validators.maxLength(UserFieldsLength.avatar.max)]
    },
    {
      key: UserRequestEnum.InfoYourself,
      value: user.infoYourself,
      validators: [Validators.maxLength(UserFieldsLength.infoYourself.max)]
    },
  ];

  const isValid = checkValidatorsAll(validations, error);
  if (isValid) {
    callback(null, 200, stepsResults);
  } else {
    callback(error, error.status, null);
  }
}
