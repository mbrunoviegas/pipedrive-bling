import { Deal } from 'src/shared/core/domain/Deal';
import { IDeal } from 'src/shared/core/interfaces/deal.interface';

export class DealsMapper {
  public static toDto(deal: Deal): IDeal {
    return {
      title: deal.title,
      status: deal.status,
      currency: deal.currency,
      value: deal.value,
    };
  }
}
