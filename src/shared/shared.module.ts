import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosProvider } from './core/providers/implementations/axios.provider';
import { MomentjsProvider } from './core/providers/implementations/momentjs.provider';
import { XmlBuilderProvider } from './core/providers/implementations/xmlBuilder.provider';
import { OrdersTypeOrmRepo } from './infra/database/repositories/implementations/dealsTypeOrmRepo.repository';
import { OrdersEntity } from './infra/database/typeorm/entities/orders.entity';
import { MyTypeOrmModule } from './infra/database/typeorm/typeorm.module';

@Module({
  imports: [MyTypeOrmModule, TypeOrmModule.forFeature([OrdersEntity])],
  providers: [
    AxiosProvider,
    XmlBuilderProvider,
    MomentjsProvider,
    OrdersTypeOrmRepo,
  ],
  exports: [
    AxiosProvider,
    MyTypeOrmModule,
    XmlBuilderProvider,
    MomentjsProvider,
    OrdersTypeOrmRepo,
  ],
})
export class SharedModule {}
