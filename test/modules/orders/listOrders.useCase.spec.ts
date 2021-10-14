import { Test } from '@nestjs/testing';
import { ListOrdersUseCase } from '../../../src/modules/orders/useCases/listOrders/listOrders.useCase';
import { Order } from '../../../src/shared/core/domain/Order';
import { IOrdersRepository } from '../../../src/shared/infra/database/repositories/dealsRepository.interface';
import { OrdersTypeOrmRepo } from '../../../src/shared/infra/database/repositories/implementations/dealsTypeOrmRepo.repository';
import { OrderTypeOrmRepoInMemory } from '../../inMemory/repositories/ordersTypeOrmRepo.inMemory';

describe('List Orders Use Case', () => {
  let listOrderUseCase: ListOrdersUseCase;
  let ordersRepo: IOrdersRepository;

  beforeAll(async () => {
    const moduleFix = await Test.createTestingModule({
      providers: [ListOrdersUseCase, OrdersTypeOrmRepo],
    })
      .overrideProvider(OrdersTypeOrmRepo)
      .useClass(OrderTypeOrmRepoInMemory)
      .compile();

    listOrderUseCase = moduleFix.get(ListOrdersUseCase);
    ordersRepo = moduleFix.get<IOrdersRepository>(OrdersTypeOrmRepo);
  });

  test('listOrderUseCase should be defined', () => {
    expect(listOrderUseCase).toBeDefined();
  });

  test('ordersRepo should be defined', () => {
    expect(ordersRepo).toBeDefined();
  });

  test('Should list 1 order created according to actual date', async () => {
    const actualDate = new Date();
    await ordersRepo.create([
      Order.create({
        value: 120.0,
        createdAt: actualDate,
      }),
    ]);

    const orders = await listOrderUseCase.execute();

    expect(orders).toHaveLength(1);
    expect(orders[0]).toHaveProperty('value', 120.0);
    expect(orders[0]).toHaveProperty('createdAt', actualDate);
  });
});
