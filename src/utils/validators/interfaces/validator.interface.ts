import { ValidatorType } from '../types/validators-types';

export interface ValidatorInterface {
  key: string;
  value: any;
  validators: ValidatorType[];
}

export interface ValidatorResponseInterface {
  key: string;
  isValid: boolean;
}
