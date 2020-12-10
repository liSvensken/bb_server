import { ValidatorFnType, ValidatorType } from './types/validators-types';
import { ValidatorInterface, ValidatorResponseInterface } from './interfaces/validator.interface';
import { ErrorInterface } from '../errors/error.interface';
import { ErrorTypes } from '../errors/error.types';
import { UserRole } from '../../types/user-role.type';
import { UserGender } from '../../types/user-gender.type';

export function checkValidatorsAll(validator: ValidatorInterface[], error: ErrorInterface): boolean {
  let isValid = true;
  validator.some(v => {
    isValid = checkValidator(v, error);
    if (!isValid) {
      return true;
    }
  });

  return isValid;
}

export function checkValidator(validator: ValidatorInterface, error: ErrorInterface): boolean {
  let isValid = true;

  validator.validators.some(v => {
    if (v(validator.value)) {
      const validResponse = v(validator.value);
      isValid = validResponse.isValid;
      if (!isValid) {
        switch (validResponse.key) {
          case 'required':
            error.type = ErrorTypes.BadRequest;
            error.field = validator.key;
            error.message = `field "${ validator.key }" is empty when it is required`;
            error.status = 400;
            break;

          case 'minLength':
            error.type = ErrorTypes.BadRequest;
            error.field = validator.key;
            error.message = `field "${ validator.key }" length is less than the minimum length`;
            error.status = 400;
            break;

          case 'maxLength':
            error.type = ErrorTypes.BadRequest;
            error.field = validator.key;
            error.message = `field "${ validator.key }" length exceeds the maximum length`;
            error.status = 400;
            break;

          case 'matchEnum':
            error.type = ErrorTypes.BadRequest;
            error.field = validator.key;
            error.message = `field "${ validator.key }" doesn't match the enum`;
            error.status = 400;
            break;

          case 'regular':
            error.type = ErrorTypes.BadRequest;
            error.field = validator.key;
            error.message = `field "${ validator.key }" doesn't match its type`;
            error.status = 400;
            break;
        }
        return true;
      }
    }
  });
  return isValid;
}

export class Validators {
  static required: ValidatorType = (value: string | number | number[]): ValidatorResponseInterface => {
    return {
      key: 'required',
      isValid: !!value // && value !== 0 && value !== ''
    };
  }

  static minLength: ValidatorFnType = (num: number): ValidatorType => {
    return (value: string | number[]): ValidatorResponseInterface => {
      if (value) {
        return {
          key: 'minLength',
          isValid: value.length >= num
        };
      }
    }
  }

  static maxLength: ValidatorFnType = (num: number): ValidatorType => {
    return (value: string | number[]): ValidatorResponseInterface => {
      if (value) {
        return {
          key: 'maxLength',
          isValid: value.length <= num
        };
      }
    }
  }

  static matchEnum: ValidatorFnType = (en: any): ValidatorType => {
    return (value: UserRole | UserGender): ValidatorResponseInterface => {
      if (value) {
        return {
          key: 'matchEnum ',
          isValid: en[value]
        };
      }
    }
  }

  static regular: ValidatorFnType = (reg: RegExp): ValidatorType => {
    return (value: any): ValidatorResponseInterface => {
      if (value) {
        return {
          key: 'regular',
          isValid: value.match(reg)
        };
      }
    }
  }
}
