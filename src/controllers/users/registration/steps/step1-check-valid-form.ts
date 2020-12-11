import { ValidatorInterface } from '../../../../utils/validators/interfaces/validator.interface';
import { checkValidatorsAll, Validators } from '../../../../utils/validators/api-validators';
import { UserRoleType } from '../../../../types/user-role.type';
import { UserFieldsLength } from '../../../../utils/validators/consts/user-fields-length';
import { emailReg, nicknameReg, phoneReg } from '../../../../utils/regulars';
import { UserGenderType } from '../../../../types/user-gender.type';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { UserRegistrationRequest } from '../interfaces/user-registration-request.interface';
import { UserDbEnum } from '../../../../enums/users/user-request.enum';
import { StepsResultRegistration } from '../interfaces/steps-result-registration.interface';

export const step1CheckValidForm = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultRegistration) => void,
                                    user: UserRegistrationRequest, stepsResults: StepsResultRegistration) => {
  let error: ErrorInterface = {
    type: '',
    field: '',
    message: '',
    status: 0,
  };

  const validations: ValidatorInterface[] = [
    {
      key: UserDbEnum.Role,
      value: user.role,
      validators: [Validators.required, Validators.matchEnum(UserRoleType)]
    },
    {
      key: UserDbEnum.Nickname,
      value: user.nickname,
      validators: [Validators.required, Validators.minLength(UserFieldsLength.nickname.min),
        Validators.maxLength(UserFieldsLength.nickname.max), Validators.regular(nicknameReg)]
    },
    {
      key: UserDbEnum.Email,
      value: user.email,
      validators: [Validators.required, Validators.minLength(UserFieldsLength.email.min),
        Validators.maxLength(UserFieldsLength.email.max), Validators.regular(emailReg)]
    },
    {
      key: UserDbEnum.Password,
      value: user.password,
      validators: [Validators.required, Validators.minLength(UserFieldsLength.password.min),
        Validators.maxLength(UserFieldsLength.password.max)]
    },
    {
      key: UserDbEnum.LastsName,
      value: user.lastsName,
      validators: [Validators.minLength(UserFieldsLength.lastsName.min),
        Validators.maxLength(UserFieldsLength.lastsName.max)]
    },
    {
      key: UserDbEnum.FirsName,
      value: user.firsName,
      validators: [Validators.minLength(UserFieldsLength.firsName.min),
        Validators.maxLength(UserFieldsLength.firsName.max)]
    },
    {
      key: UserDbEnum.ServiceIds,
      value: user.serviceIds,
      validators: [Validators.maxLength(UserFieldsLength.serviceIds.max)]
    },
    {
      key: UserDbEnum.CityIds,
      value: user.cityIds,
      validators: [Validators.maxLength(UserFieldsLength.cityIds.max)]
    },
    {
      key: UserDbEnum.Phone,
      value: user.phone,
      validators: [Validators.regular(phoneReg)]
    },
    {
      key: UserDbEnum.Gender,
      value: user.gender,
      validators: [Validators.matchEnum(UserGenderType)]
    },
    {
      key: UserDbEnum.Birthday,
      value: user.phone,
      validators: [Validators.maxLength(UserFieldsLength.birthday.max)]
    },
    {
      key: UserDbEnum.Avatar,
      value: user.phone,
      validators: [Validators.maxLength(UserFieldsLength.avatar.max)]
    },
    {
      key: UserDbEnum.InfoYourself,
      value: user.phone,
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
