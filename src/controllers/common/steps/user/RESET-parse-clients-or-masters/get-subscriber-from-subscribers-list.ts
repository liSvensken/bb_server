// import { ErrorInterface } from '../../../../../utils/errors/error.interface';
// import { UserResponseModel } from '../../../../../models/user/user-response.model';
// import { parseMySubscriber } from './parse-my-subscriber';
//
// export const getSubscriberFromSubscribersList = ((callback: (err: ErrorInterface, statusCode: number, userRes: UserResponseModel[]) => void,
//                                                   subscribersIds: number[]) => {
//
//   let mySubscribers: UserResponseModel[] = [];
//
//   // вместо синхронного forEach (1 итерация - 1 myMaster)
//   const subscribersIteration = (masterValues: IterableIterator<number>) => {
//     const subscriberId = masterValues.next().value;
//     numIterSubscribers++;
//
//     parseMySubscriber((err, statusCode, result) => {
//       if (!err) {
//         mySubscribers.push(result);
//         if (numIterSubscribers < subscribersIds.length) { // НЕпоследня итарация по myMasters
//           subscribersIteration(masterValues);
//         } else {
//           callback(null, 200, mySubscribers); // последня итарация по myMasters
//         }
//       } else {
//         callback(err, statusCode, null);
//       }
//     }, subscriberId)
//   }
//
//   let numIterSubscribers = 0;
//   const subscriberValues = subscribersIds.values();
//   subscribersIteration(subscriberValues)
// })
