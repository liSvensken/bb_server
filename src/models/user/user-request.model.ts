import { UserConstFields } from './common/user-const-fields.interface';

export interface UserRequestModel extends UserConstFields {
  password: string;
  serviceIds?: number[];
  cityIds?: number[];
}
