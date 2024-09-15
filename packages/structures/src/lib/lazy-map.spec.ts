import { LazyMap } from './lazy-map';

describe('LazyMap', () => {
  it('should resolve value only once', () => {
    const resolve = jest.fn(
      (key: number): number => 2 * key,
    );

    const map = new LazyMap<number, number>(resolve);

    expect(map.get(2)).toBe(2 * 2);
    expect(map.get(5)).toBe(2 * 5);
    expect(map.get(2)).toBe(2 * 2);

    expect(resolve).toHaveBeenCalledTimes(2);
  });
});
