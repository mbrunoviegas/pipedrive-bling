import { Inject, Injectable } from '@nestjs/common';
import { Deal } from '../../../../shared/core/domain/Deal';
import { BodyTypeEnum } from '../../../../shared/core/enum/bodyType.enum';
import { MethodTypeEnum } from '../../../../shared/core/enum/methodType.enum';
import { AxiosProvider } from '../../../../shared/core/providers/implementations/axios.provider';
import { IRequestExternalService } from '../../../../shared/core/providers/requestExternalService.interface';
import { ICreatePayload, IDealsProvider } from '../deals.interface';
import { PipedriveListPayloadResponse } from '../types/pipedriveDeals';

@Injectable()
export class PipedriveDealsProvider implements IDealsProvider {
  constructor(
    @Inject(AxiosProvider)
    private requestProvider: IRequestExternalService,
  ) {}
  private END_POINT = 'deals';

  async create({
    orgId: orderId,
    status,
    value,
    title,
  }: ICreatePayload): Promise<void> {
    const { status: responseSatatus, body } =
      await this.requestProvider.request({
        method: MethodTypeEnum.POST,
        url: `${process.env.PIPEDRIVE_BASE_URL}/${this.END_POINT}`,
        params: {
          api_token: process.env.PIPEDRIVE_API_TOKEN,
        },
        body: {
          org_id: orderId,
          status,
          value,
          title,
        },
        bodyType: BodyTypeEnum.JSON,
      });

    if (responseSatatus !== 201) {
      throw new Error('Failed to create new deal in pipedrive api');
    }
  }

  async list(): Promise<Deal[]> {
    const DEALS_STATUS = 'won';
    const { status, body } =
      await this.requestProvider.request<PipedriveListPayloadResponse>({
        method: MethodTypeEnum.GET,
        url: `${process.env.PIPEDRIVE_BASE_URL}/${this.END_POINT}`,
        params: {
          api_token: process.env.PIPEDRIVE_API_TOKEN,
          status: DEALS_STATUS,
        },
      });

    if (status !== 200 || !body.success) {
      throw new Error(body.error);
    }

    return body.data.map(({ currency, value, title, status }) =>
      Deal.create({
        currency,
        value,
        title,
        status,
      }),
    );
  }
}
