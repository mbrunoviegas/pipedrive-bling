import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { BodyTypeEnum } from '../../enum/bodyType.enum';
import { IRequestDataExternalService } from '../../interfaces/requestDataExternalService.interface';
import { IResponseDataExternalService } from '../../interfaces/responseDataExternalService.interface';
import { IRequestExternalService } from '../requestExternalService.interface';

@Injectable()
export class AxiosProvider implements IRequestExternalService {
  async request<T>(
    payload: IRequestDataExternalService,
  ): Promise<IResponseDataExternalService<T>> {
    const body = payload.bodyType
      ? this.convertBody(payload.bodyType, payload.body)
      : payload.body;
    const axiosRequest = {
      url: payload.url,
      method: payload.method,
      headers: payload.headers || {},
      data: body,
      params: payload.params,
    } as AxiosRequestConfig;

    return await this.executeAxiosRequest(axiosRequest);
  }

  private convertBody(type: BodyTypeEnum, body: any) {
    const types = {
      [BodyTypeEnum.FORM]: stringify,
    };
    const bodyTypeFunction = types[type];
    return bodyTypeFunction ? bodyTypeFunction(body) : body;
  }

  private buildResponse(response: AxiosResponse): IResponseDataExternalService {
    return {
      status: response.status,
      body: response.data,
      headers: response.headers,
    };
  }

  private async executeAxiosRequest(
    axiosRequest: AxiosRequestConfig,
  ): Promise<IResponseDataExternalService> {
    try {
      const response = await axios.request(axiosRequest);
      return this.buildResponse(response);
    } catch (res) {
      if (res.response) {
        return this.buildResponse(res.response);
      } else {
        return {
          status: 500,
          body: res,
          headers: null,
        } as IResponseDataExternalService;
      }
    }
  }
}
