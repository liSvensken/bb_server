import { ValidatorResponseInterface } from '../interfaces/validator.interface';

export type ValidatorFnType = (value: any) => ValidatorType;
export type ValidatorType = (value: any) => ValidatorResponseInterface;
