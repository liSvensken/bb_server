import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserRole } from '../../../../types/user-role.type';

export interface step4AuthResult {
  id:  number,
  role: UserRole,
  nickname: string
}

export interface StepsResultAuthorization {
  step1GetUserFromDb: UserDbModel;
  step3CreateToken: string;
  step4AuthResult: step4AuthResult;
}
