import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { DealsModule } from './modules/deals/deals.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    SharedModule,
    DealsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
