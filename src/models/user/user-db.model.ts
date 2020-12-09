import { UserConstFields } from './common/user-const-fields.interface';

export interface UserDbModel extends UserConstFields {
  id: number;
  serviceIdsStr?: string;
  cityIdsStr?: string;
}
