import { Deal } from '../../../shared/core/domain/Deal';

export interface ICreatePayload {
  title: string;
  status: string;
  value: number;
  orgId: number;
}

export interface IDealsProvider {
  create(payload: ICreatePayload): Promise<void>;
  list(): Promise<Deal[]>;
}
