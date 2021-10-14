import { BodyTypeEnum } from '../enum/bodyType.enum';
import { MethodTypeEnum } from '../enum/methodType.enum';

export class IRequestDataExternalService {
  url: string;
  method: MethodTypeEnum;
  body?: any;
  headers?: any;
  params?: any;
  bodyType?: BodyTypeEnum;
}
