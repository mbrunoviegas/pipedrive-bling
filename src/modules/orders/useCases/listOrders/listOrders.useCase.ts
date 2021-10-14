import { Inject } from '@nestjs/common';
import { IOrderDTO } from '../../../../shared/core/interfaces/order.interface';
import { IUseCase } from '../../../../shared/core/interfaces/useCase.interface';
import { OrdersMapper } from '../../../../shared/core/mappers/order.mapper';
import { IOrdersRepository } from '../../../../shared/infra/database/repositories/dealsRepository.interface';
import { OrdersTypeOrmRepo } from '../../../../shared/infra/database/repositories/implementations/dealsTypeOrmRepo.repository';

export class ListOrdersUseCase implements IUseCase<any, IOrderDTO[]> {
  constructor(
    @Inject(OrdersTypeOrmRepo)
    private orderRepo: IOrdersRepository,
  ) {}

  async execute(): Promise<IOrderDTO[]> {
    const orders = await this.orderRepo.list();

    return orders.map(OrdersMapper.toDto);
  }
}
