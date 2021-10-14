import { Order } from '../../../core/domain/Order';

export interface IOrdersRepository {
  create(order: Order[]): Promise<void>;
  list(): Promise<Order[]>;
}
