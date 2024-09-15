export class KeySerializedMap<TKey, TValue> implements Map<TKey, TValue> {
  private proxy: Map<string, TValue>;

  constructor(entries?: ReadonlyArray<readonly [TKey, TValue]> | null) {
    this.proxy = new Map<string, TValue>(
      entries?.map(([key, value]) => [this.serializeKey(key), value]),
    );
  }

  get size(): number {
    return this.proxy.size;
  }

  get [Symbol.toStringTag](): string {
    return this.proxy[Symbol.toStringTag];
  }

  clear(): void {
    this.proxy.clear();
  }

  delete(key: TKey): boolean {
    return this.proxy.delete(this.serializeKey(key));
  }

  forEach(
    callbackfn: (value: TValue, key: TKey, map: Map<TKey, TValue>) => void,
    thisArg?: never,
  ): void {
    for (const [key, value] of this.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get(key: TKey): TValue | undefined {
    return this.proxy.get(this.serializeKey(key));
  }

  has(key: TKey): boolean {
    return this.proxy.has(this.serializeKey(key));
  }

  set(key: TKey, value: TValue): this {
    this.proxy.set(this.serializeKey(key), value);

    return this;
  }

  entries(): IterableIterator<[TKey, TValue]> {
    return this[Symbol.iterator]();
  }

  keys(): IterableIterator<TKey> {
    return [...this.proxy.keys()]
      .map((key) => this.deserializeKey(key))
      [Symbol.iterator]();
  }

  values(): IterableIterator<TValue> {
    return this.proxy.values();
  }

  [Symbol.iterator](): IterableIterator<[TKey, TValue]> {
    return [...this.proxy.entries()]
      .map(
        ([key, value]) =>
          [this.deserializeKey(key), value] as [TKey, TValue],
      )
      [Symbol.iterator]();
  }

  protected serializeKey(key: TKey): string {
    try {
      return JSON.stringify(key);
    } catch (error) {
      throw new Error(
        `KeySerializedMap Error, could not serialize the key ${key}, possibly the provided key has a circular reference :${error}`,
      );
    }
  }

  protected deserializeKey(key: string): TKey {
    try {
      return JSON.parse(key) as TKey;
    } catch (error) {
      throw new Error(
        `KeySerializedMap Error, could not deserialize the key ${key} :${error}`,
      );
    }
  }
}
