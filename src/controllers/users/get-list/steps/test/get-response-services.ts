import { ErrorInterface } from '../../../../../utils/errors/error.interface';
import { UserDbModel } from '../../../../../models/user/user-db.model';
import { UserRequestModel } from '../../../../../models/user/user-request.model';
import { getItemsTableByIds } from '../../../../common/steps/get-items-table-by-ids';
import { TablesEnum } from '../../../../../enums/tables-name.enum';
import { UserRequestEnum } from '../../../../../enums/user-request.enum';

// export const getResponseServices = (callback: (err: ErrorInterface, statusCode: number, result?: any) => void,
//                                     userReq: UserRequestModel) => {
//   getItemsTableByIds((err, statusCode, result) => {
//     if (!err) {
//       user.services = result;
//       userResponse.push(user);
//     } else {
//       callback(err, statusCode, null);
//     }
//   }, TablesEnum.Services, userReq.serviceIds, UserRequestEnum.ServiceIds);
// }
