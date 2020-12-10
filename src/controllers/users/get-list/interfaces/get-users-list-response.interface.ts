import { UserResponseModel } from '../../../../models/user/user-response.model';
import { CommonResponse } from '../../../common/interfaces/common-response.interface';

export interface GetUsersListResponse extends CommonResponse<UserResponseModel[]> {
}
