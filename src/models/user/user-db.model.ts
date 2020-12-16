import { UserConstFields } from './common/user-const-fields.interface';

export interface UserDbModel extends UserConstFields {
  id: number;
  passwordHash: string,
  serviceIdsStr?: string;
  cityIdsStr?: string;
  myMasterIdsStr?: string;
  myClientIdsStr?: string;
}
