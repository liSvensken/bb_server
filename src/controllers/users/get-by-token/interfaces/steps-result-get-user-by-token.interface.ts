import { UserDbModel } from '../../../../models/user/user-db.model';
import { UserResponseModel } from '../../../../models/user/user-response.model';

interface UserId {
  id: number
}

export interface StepsResultGetUserByToken {
  step1GetUserId: UserId;
  step2GetUserFromDb: UserDbModel[];
  step3TransformInUserResponse: UserResponseModel[]
}
