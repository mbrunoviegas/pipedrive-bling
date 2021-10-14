import { ObjectId } from 'mongodb';
import { DeepPartial } from 'typeorm';
import { OrdersEntity } from '../../../shared/infra/database/typeorm/entities/orders.entity';
import { Order } from '../domain/Order';
import { IOrderDTO } from '../interfaces/order.interface';

export class OrdersMapper {
  public static toDomain(order: DeepPartial<OrdersEntity>): Order {
    return Order.create(
      {
        value: order.value,
        createdAt: order.createdAt as Date,
      },
      order._id as ObjectId,
    );
  }

  public static toDto(order: Order): IOrderDTO {
    return {
      value: order.value,
      createdAt: order.createdAt,
    };
  }

  public static toPersistence(order: Order): DeepPartial<OrdersEntity> {
    return {
      value: order.value,
    };
  }
}
