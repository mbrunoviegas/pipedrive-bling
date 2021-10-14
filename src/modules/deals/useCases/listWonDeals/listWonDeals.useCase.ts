import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from 'eventemitter2';
import { IUseCase } from '../../../../shared/core/interfaces/useCase.interface';
import { DealsMapper } from '../../../../shared/core/mappers/deals.mapper';
import { IDealsProvider } from '../../providers/deals.interface';
import { PipedriveDealsProvider } from '../../providers/implementations/pipedriveDeals.provider';
import { IListPayloadResponseDTO } from './dto/listPayloadResponse.dto';

@Injectable()
export class ListWonDealsUseCase
  implements IUseCase<any, IListPayloadResponseDTO>
{
  constructor(
    @Inject(PipedriveDealsProvider)
    private dealsProvider: IDealsProvider,
    private eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  private async emitEventToCreateOrderDeals(): Promise<void> {
    const deals = await this.dealsProvider.list();
    this.eventEmitter.emit('order.create', deals);
  }

  async execute(): Promise<IListPayloadResponseDTO> {
    const deals = await this.dealsProvider.list();
    return { deals: deals.map(DealsMapper.toDto) };
  }
}
