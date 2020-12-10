import { ServiceModel } from '../service.model';

export function isServices(param: any[]): param is ServiceModel[] {
  param.forEach(elem => {
    if (!((elem as ServiceModel).id) ||
        !((elem as ServiceModel).name)) {
      return false;
    }
  })
  return true;
}
