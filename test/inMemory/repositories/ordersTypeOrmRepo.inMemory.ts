import { DeepPartial } from 'typeorm';
import { Order } from '../../../src/shared/core/domain/Order';
import { OrdersMapper } from '../../../src/shared/core/mappers/order.mapper';
import { MomentjsProvider } from '../../../src/shared/core/providers/implementations/momentjs.provider';
import { IOrdersRepository } from '../../../src/shared/infra/database/repositories/dealsRepository.interface';
import { OrdersEntity } from '../../../src/shared/infra/database/typeorm/entities/orders.entity';

export class OrderTypeOrmRepoInMemory implements IOrdersRepository {
  private orders: DeepPartial<OrdersEntity>[] = [];
  private dateProvider = new MomentjsProvider();

  async create(orders: Order[]): Promise<void> {
    let totalAmount: number;
    const initDate = this.dateProvider.startOfDay();
    const endDate = this.dateProvider.endOfDay();
    const index = this.orders.findIndex(
      (data) => data.createdAt >= initDate && data <= endDate,
    );

    if (index !== -1) {
      totalAmount = orders.reduce(
        (acumulator, actualValue) => acumulator + actualValue.value,
        this.orders[index].value,
      );
      this.orders[index].value = totalAmount;
    } else {
      totalAmount = orders.reduce(
        (acumulator, actualValue) => acumulator + actualValue.value,
        0,
      );
      const rawOrder = new OrdersEntity();
      rawOrder.createdAt = orders[0].createdAt;
      rawOrder.value = totalAmount;

      this.orders.push(rawOrder);
    }
  }

  async list(): Promise<Order[]> {
    return this.orders.map(OrdersMapper.toDomain);
  }
}
