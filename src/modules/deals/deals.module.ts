import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { DealsController } from './controllers/deals.controller';
import { PipedriveDealsProvider } from './providers/implementations/pipedriveDeals.provider';
import { CreateDealUseCase } from './useCases/createDeal/createDeal.useCase';
import { ListWonDealsUseCase } from './useCases/listWonDeals/listWonDeals.useCase';

@Module({
  imports: [SharedModule],
  controllers: [DealsController],
  providers: [ListWonDealsUseCase, CreateDealUseCase, PipedriveDealsProvider],
})
export class DealsModule {}
