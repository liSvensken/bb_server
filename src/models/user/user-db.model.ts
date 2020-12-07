import { UserConstFields } from './common/user-const-fields.interface';

export interface UserDbModel extends UserConstFields {
  serviceIdsStr?: string;
  cityIdsStr?: string;
}
