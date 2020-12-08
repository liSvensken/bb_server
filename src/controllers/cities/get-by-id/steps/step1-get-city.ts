import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServiceModel } from '../../../../models/service/service.model';
import { getRowByField } from '../../../common/steps/get-row-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';
import { CitiesDbEnum } from '../../../../enums/cities-table/cities-db.enum';

export const step1GetCity = (callback: (err: ErrorInterface, statusCode: number, result: ServiceModel[]) => void,
                             id: string) => {
  getRowByField(callback, TablesEnum.Cities, JSON.parse(id), CitiesDbEnum.Id);
}
