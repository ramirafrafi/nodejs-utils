import { KeySerializedMap } from './key-serialized-map';

describe('KeySerializedMap', () => {
  it('should use same array elems as key', () => {
    const map = new KeySerializedMap<[number, number], string>();

    map.set([1, 2], 'value');
    map.set([1, 2], 'value edited');

    expect(map.size).toBe(1);
    expect(map.get([1, 2])).toBe('value edited');
    expect(map.get([2, 1])).toBeUndefined();
    expect(map.get(JSON.parse('[1,2]') as [number, number])).toBe(
      'value edited',
    );
  });

  it('should use same object props as key', () => {
    const map = new KeySerializedMap<Record<string, string>, string>();

    map.set({ prop1: 'key_1', prop2: 'key_2' }, 'value');
    map.set({ prop1: 'key_1', prop2: 'key_2' }, 'value edited');

    expect(map.size).toBe(1);
    expect(map.get({ prop1: 'key_1', prop2: 'key_2' })).toBe(
      'value edited',
    );
    expect(map.get({ prop2: 'key_2', prop1: 'key_1' })).toBeUndefined();
    expect(
      map.get(
        JSON.parse('{"prop1":"key_1","prop2":"key_2"}') as {
          prop1: string;
          prop2: string;
        },
      ),
    ).toBe('value edited');
  });

  it('should use number as key', () => {
    const map = new KeySerializedMap<number, string>();

    map.set(1, 'value');
    map.set(1, 'value edited');

    expect(map.size).toBe(1);
    expect(map.get(1)).toBe('value edited');
    expect(map.get(2)).toBeUndefined();
    expect(map.get(JSON.parse('1') as number)).toBe('value edited');
    expect(map.get(JSON.parse('"1"') as number)).toBeUndefined();
  });
});
