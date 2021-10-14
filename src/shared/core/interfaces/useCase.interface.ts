export interface IUseCase<IRequest, IResponse> {
  execute(payload?: IRequest): IResponse | Promise<IResponse>;
}
