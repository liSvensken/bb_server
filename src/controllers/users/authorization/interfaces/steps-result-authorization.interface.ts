import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export interface StepsResultAuthorization {
  step1GetUserFromDb: UserDbModel[];
  step3CreateToken: string;
  step4TransformInUserResponse: UserResponseModel[];
}
