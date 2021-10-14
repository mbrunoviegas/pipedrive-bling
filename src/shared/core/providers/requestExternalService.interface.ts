import { IRequestDataExternalService } from '../interfaces/requestDataExternalService.interface';
import { IResponseDataExternalService } from '../interfaces/responseDataExternalService.interface';

export interface IRequestExternalService {
  request<T>(
    payload: IRequestDataExternalService,
  ): Promise<IResponseDataExternalService<T>>;
}
