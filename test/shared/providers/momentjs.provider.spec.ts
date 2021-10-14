import { MomentjsProvider } from '../../../src/shared/core/providers/implementations/momentjs.provider';

describe('Momentjs Provider', () => {
  const momentProvider = new MomentjsProvider();

  test('Should generate a date with time 0', () => {
    const date = momentProvider.startOfDay();

    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });
});
