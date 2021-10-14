import { Column, Entity } from 'typeorm';
import { BaseEntity } from './_baseEntity';

@Entity('orders')
export class OrdersEntity extends BaseEntity {
  @Column()
  value: number;
}
