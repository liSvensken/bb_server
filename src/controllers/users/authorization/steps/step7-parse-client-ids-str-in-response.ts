import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { parseClientIdsStrInResponse } from '../../../common/steps/user/parse-client-ids-str-in-response';
import { UserRoleType } from '../../../../types/user-role.type';
import { StepsResultAuthorization } from '../interfaces/steps-result-authorization.interface';

export const step7ParseClientIdsStrInResponse = (callback: (err: ErrorInterface, statusCode: number, nowStepsResults: StepsResultAuthorization) => void,
                                                 stepsResults: StepsResultAuthorization) => {
  const role = stepsResults.step4TransformInUserResponse[0].role;

  switch (true) {
    case role === UserRoleType.MASTER:
      parseClientIdsStrInResponse((err, statusCode, userRes) => {
        if (!err) {
          stepsResults.step4TransformInUserResponse = userRes;
          callback(null, 200, stepsResults);
        } else {
          callback(err, statusCode, null);
        }
      }, stepsResults.step1GetUserFromDb, stepsResults.step4TransformInUserResponse);
      break;

    case role === UserRoleType.CLIENT:
      callback(null, 200, stepsResults);
  }
}
