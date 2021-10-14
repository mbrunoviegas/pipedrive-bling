import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateDealUseCase } from '../useCases/createDeal/createDeal.useCase';
import { ICreatePayloadRequestDTO } from '../useCases/createDeal/dto/createPayloadRequest.dto';
import { ListWonDealsUseCase } from '../useCases/listWonDeals/listWonDeals.useCase';

@Controller('deals')
export class DealsController {
  constructor(
    private listWonDealsUseCase: ListWonDealsUseCase,
    private createDealUseCase: CreateDealUseCase,
  ) {}

  @Get()
  async listWon(@Res() response: Response) {
    return this.listWonDealsUseCase.execute().then((res) => {
      response.status(200).json(res);
    });
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body() payload: ICreatePayloadRequestDTO,
  ) {
    return this.createDealUseCase.execute(payload).then((res) => {
      response.status(201).send();
    });
  }
}
