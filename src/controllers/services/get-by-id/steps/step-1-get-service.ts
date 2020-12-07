import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { getServiceById } from '../../../common/steps/service/get-service-by-id';

export const step1GetService = (callback: (err: ErrorInterface, statusCode: number, result: ServiceModel[]) => void,
                                id: string) => {
  // getServiceById(callback, id);
}
