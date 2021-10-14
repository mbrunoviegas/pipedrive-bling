import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDateProvider } from '../../../../../shared/core/providers/dateProvider.interface';
import { MomentjsProvider } from '../../../../../shared/core/providers/implementations/momentjs.provider';
import { Order } from '../../../../core/domain/Order';
import { OrdersMapper } from '../../../../core/mappers/order.mapper';
import { OrdersEntity } from '../../typeorm/entities/orders.entity';
import { IOrdersRepository } from '../dealsRepository.interface';

@Injectable()
export class OrdersTypeOrmRepo implements IOrdersRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
    @Inject(MomentjsProvider)
    private dateProvider: IDateProvider,
  ) {}

  async create(orders: Order[]): Promise<void> {
    const initDate = this.dateProvider.startOfDay();
    const endDate = this.dateProvider.endOfDay();
    let totalAmount: number;

    let rawOrder = await this.ordersRepository.findOne({
      where: {
        createdAt: {
          $gte: initDate,
          $lt: endDate,
        },
      },
    });

    if (rawOrder) {
      totalAmount = orders.reduce(
        (acumulator, actualValue) => acumulator + actualValue.value,
        rawOrder.value,
      );
      rawOrder.value = totalAmount;
    } else {
      totalAmount = orders.reduce(
        (acumulator, actualValue) => acumulator + actualValue.value,
        0,
      );

      rawOrder = this.ordersRepository.create({ value: totalAmount });
    }

    await this.ordersRepository.save(rawOrder);
  }

  async list(): Promise<Order[]> {
    const orders = await this.ordersRepository.find();
    return orders.map(OrdersMapper.toDomain);
  }
}
