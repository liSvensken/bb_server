import { UserConstFields } from './common/user-const-fields.interface';

export interface UserRequestModel extends UserConstFields {
  serviceIds?: number[];
  cityIds?: number[];
}
