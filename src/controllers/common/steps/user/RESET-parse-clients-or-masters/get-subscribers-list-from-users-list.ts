// import { ErrorInterface } from '../../../../../utils/errors/error.interface';
// import { UserResponseModel } from '../../../../../models/user/user-response.model';
// import { UserRole, UserRoleType } from '../../../../../types/user-role.type';
// import { UserDbModel } from '../../../../../models/user/user-db.model';
// import { parseMySubscriber } from './parse-my-subscriber';
// import { getSubscriberFromSubscribersList } from './get-subscriber-from-subscribers-list';
//
// export const getSubscribersListFromUsersList = ((callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
//                                                  currentUserRole: UserRole, usersDb: UserDbModel[], usersResponse: UserResponseModel[]) => {
//
//   // вместо синхронного forEach (1 итерация - 1 User)
//   const userDbIteration = (userDbValues: IterableIterator<UserDbModel>) => {
//     const userDb = userDbValues.next().value;
//     numIterUsers++;
//     let mySubscribersIds: number[];
//
//     switch (currentUserRole) {
//       case UserRoleType.MASTER:
//         mySubscribersIds = userDb.myClientIdsStr ? JSON.parse(userDb.myClientIdsStr) : null;
//         break;
//
//       case UserRoleType.CLIENT:
//         mySubscribersIds = userDb.myMasterIdsStr ? JSON.parse(userDb.myMasterIdsStr) : null;
//         break;
//     }
//
//     switch (true) {
//       case !!(mySubscribersIds): // У юзера есть клиенты / мастера
//         // парсим одного клиента / мастера
//         getSubscriberFromSubscribersList((err, statusCode, result) => {
//           if (!err) {
//             if (currentUserRole === UserRoleType.MASTER) {
//               usersResponse[numIterUsers - 1].myClients = result;
//             } else if (currentUserRole === UserRoleType.CLIENT) {
//               usersResponse[numIterUsers - 1].myMasters = result;
//             }
//             if (numIterUsers < usersDb.length) { // ... и это НЕпоследня итерация по User's
//               userDbIteration(userDbValues);
//             } else {
//               callback(null, 200, usersResponse); // ... и это последня итерация по User's
//             }
//           } else {
//             callback(err, statusCode, null);
//           }
//         }, mySubscribersIds)
//         break;
//
//       case numIterUsers < usersDb.length: // у юзера нети клиентов / мастеров, и это НЕпоследня итерация по User's
//         userDbIteration(userDbValues);
//         break;
//
//       case numIterUsers === usersDb.length:
//         callback(null, 200, usersResponse); // у юзера нети клиентов / мастеров, и это последня итерация по User's
//         break;
//     }
//   }
//
//   let numIterUsers = 0;
//   const userDbValues = usersDb.values();
//   userDbIteration(userDbValues)
// })
