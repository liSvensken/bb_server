import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { transformUsersDbInResponse } from '../../../common/steps/user/transform-users-db-in-response';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step4TransformUserDbInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                               stepsResults: StepsResultGetUser) => {
  transformUsersDbInResponse(usersResponse => {
    stepsResults.step4TransformUserDbInResponse = usersResponse;
    callback(null, 200, stepsResults);
  }, stepsResults.step2GetUserFromDb);
}
