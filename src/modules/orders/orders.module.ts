import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { OrderController } from './controllers/order.controller';
import { BlingProvider } from './providers/implementations/bling.provider';
import { CreateOrderUseCase } from './useCases/createOrder/createOrder.useCase';
import { ListOrdersUseCase } from './useCases/listOrders/listOrders.useCase';

@Module({
  imports: [SharedModule],
  controllers: [OrderController],
  providers: [CreateOrderUseCase, BlingProvider, ListOrdersUseCase],
})
export class OrdersModule {}
