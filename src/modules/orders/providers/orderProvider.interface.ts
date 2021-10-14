import { Deal } from '../../../shared/core/domain/Deal';

export interface IOrderProvider {
  createOrder(payload: Deal[]): Promise<void>;
  listOrders(): Promise<any>;
}
