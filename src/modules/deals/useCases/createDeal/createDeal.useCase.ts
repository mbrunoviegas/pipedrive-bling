import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { v4 as uuidV4 } from 'uuid';
import { IUseCase } from '../../../../shared/core/interfaces/useCase.interface';
import { IDealsProvider } from '../../providers/deals.interface';
import { PipedriveDealsProvider } from '../../providers/implementations/pipedriveDeals.provider';
import { ICreatePayloadRequestDTO } from './dto/createPayloadRequest.dto';

@Injectable()
export class CreateDealUseCase
  implements IUseCase<ICreatePayloadRequestDTO, void>
{
  constructor(
    @Inject(PipedriveDealsProvider)
    private dealsProvider: IDealsProvider,
  ) {}

  private ORG_ID = parseInt(process.env.PIPEDRIVE_ORDER_ID);

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async scheduledCreateDeal(): Promise<void> {
    await this.dealsProvider.create({
      orgId: this.ORG_ID,
      status: 'won',
      title: `Deal - ${uuidV4()}`,
      value: 120.0,
    });
  }

  async execute(payload: ICreatePayloadRequestDTO): Promise<void> {
    await this.dealsProvider.create({
      orgId: this.ORG_ID,
      ...payload,
    });
  }
}
