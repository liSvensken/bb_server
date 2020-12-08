import { getCountRowsByField } from '../../../common/steps/get-count-rows-by-field';
import { TablesEnum } from '../../../../enums/tables-name.enum';
import { ErrorInterface } from '../../../../utils/errors/error.interface';
import { ServicesDbEnum } from '../../../../enums/services-table/services-db.enum';

export const step2GetTotalItems = (callback: (err: ErrorInterface, statusCode: number, result?: number) => void) => {
  getCountRowsByField(callback, TablesEnum.Services, ServicesDbEnum.Id);
}
