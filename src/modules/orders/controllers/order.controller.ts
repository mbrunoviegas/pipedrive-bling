import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ListOrdersUseCase } from '../useCases/listOrders/listOrders.useCase';

@Controller('orders')
export class OrderController {
  constructor(private listOrdersUseCase: ListOrdersUseCase) {}

  @Get()
  async getOrders(@Res() response: Response) {
    return this.listOrdersUseCase
      .execute()
      .then((res) => response.status(200).json(res));
  }
}
