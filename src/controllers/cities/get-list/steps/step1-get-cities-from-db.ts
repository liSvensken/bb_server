import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { getRowsList } from '../../../common/steps/get-rows-list';
import { ServiceModel } from '../../../../models/service/service.model';

export const step1GetCitiesFromDb = (callback: (err: ErrorInterface, statusCode: number, result?: ServiceModel[]) => void,
                                     limit?: number, offset?: number) => {
  getRowsList(callback, TablesEnum.Cities, limit, offset)
}
