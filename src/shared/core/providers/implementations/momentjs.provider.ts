import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { IDateProvider } from '../dateProvider.interface';

@Injectable()
export class MomentjsProvider implements IDateProvider {
  startOfDay(): Date {
    return moment().startOf('day').toDate();
  }

  endOfDay(): Date {
    return moment().endOf('day').toDate();
  }
}
