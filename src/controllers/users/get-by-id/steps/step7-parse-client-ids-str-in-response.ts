import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseClientIdsStrInResponse } from '../../../common/steps/user/parse-client-ids-str-in-response';
import { UserRole, UserRoleType } from '../../../../types/user-role.type';
import { StepsResultGetUser } from '../interfaces/steps-result.interface';

export const step7ParseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultGetUser) => void,
                                                 stepsResults: StepsResultGetUser) => {
  const role = stepsResults.step3TransformInUserResponse[0].role;

  switch (true) {
    case role === UserRoleType.MASTER:
      parseClientIdsStrInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step3TransformInUserResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step2GetUserFromDb, stepsResults.step3TransformInUserResponse);
      break;

    case role === UserRoleType.CLIENT:
      callback(null, 200, stepsResults);
  }
}
