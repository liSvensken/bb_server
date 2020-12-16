import { GetUserByTokenResponse } from './get-user-by-token-response.interface';
import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';

export interface StepsResultGetUserByToken {
  step1GetUserId: GetUserByTokenResponse;
  step2GetUserFromDb: UserDbModel[];
  step3TransformInUserResponse: UserResponseModel[]
}
