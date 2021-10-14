import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Deal } from '../../../../shared/core/domain/Deal';
import { Order } from '../../../../shared/core/domain/Order';
import { IUseCase } from '../../../../shared/core/interfaces/useCase.interface';
import { IOrdersRepository } from '../../../../shared/infra/database/repositories/dealsRepository.interface';
import { OrdersTypeOrmRepo } from '../../../../shared/infra/database/repositories/implementations/dealsTypeOrmRepo.repository';
import { BlingProvider } from '../../providers/implementations/bling.provider';
import { IOrderProvider } from '../../providers/orderProvider.interface';

@Injectable()
export class CreateOrderUseCase implements IUseCase<Deal[], void> {
  constructor(
    @Inject(BlingProvider)
    private orderProvider: IOrderProvider,
    @Inject(OrdersTypeOrmRepo)
    private ordersRepo: IOrdersRepository,
  ) {}

  @OnEvent('order.create', { async: true })
  async execute(payload: Deal[]): Promise<void> {
    await this.orderProvider.createOrder(payload);
    await this.ordersRepo.create(
      payload.map((deal) =>
        Order.create({ value: deal.value, createdAt: new Date() }),
      ),
    );
  }
}
