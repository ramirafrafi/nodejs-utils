import { KeySerializedMap } from "./key-serialized-map";

export class LazyMap<TKey, TValue> extends KeySerializedMap<TKey, TValue> {
  constructor(
    protected readonly resolve: (key: TKey) => TValue,
    entries?: ReadonlyArray<readonly [TKey, TValue]> | null,
  ) {
    super(entries);
  }

  override get(key: TKey): TValue {
    if (super.has(key)) {
      return super.get(key) as TValue;
    }

    const value = this.resolve(key);
    super.set(key, value);

    return value;
  }
}
