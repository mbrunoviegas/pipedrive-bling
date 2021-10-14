export interface IResponseDataExternalService<T = any> {
  status: number;
  body: T;
  headers: any;
}
