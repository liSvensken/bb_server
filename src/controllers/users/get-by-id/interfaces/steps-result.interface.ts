import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';
import { step1GetUserIdByToken } from '../steps/step1-get-user-id-by-token';
import { GetUserByToken } from '../../../common/interfaces/get-user-by-token-response';

export interface StepsResultGetUser {
  step1GetUserIdByToken: number;
  step2GetUserFromDb: UserDbModel[];
  step4TransformUserDbInResponse: UserResponseModel[],
}
