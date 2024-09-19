⬅️ [**Return to modules list**](../..)

# nodejs-utils/structures

## Overview
This package defines a set of util data structures, all written in TypeScript and optimized for maximum performance.

## Documentation
We are going to list the available data structures.

### KeySerializedMap
As we know, key comparison in JavaScript [**Map**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is done using [**SameValueZero**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality) algorithm, which means if the keys are arrays or objects, their equality is done by comparing the references, without looking at the content.

`KeySerializedMap` extends the native `Map` by doing a deep comparison for the keys by serializing them.

> _**NOTE:** When using keys as arrays or objects in `KeySerializedMap`, it is advised to use simple small arrays or objects with primitive values (numbers or strings) for performance and serialization issues._

**Example 1: Array as key**
```javascript
import { KeySerializedMap } from '@ramirafrafi/structures';

const map = new KeySerializedMap<[number, number], string>();

map.set([2, 3], 'value');

map.get([2, 3]) // -> returns "value"
map.get([3, 2]) // -> returns undefined, order is important !!
```

**Example 1: Object as key**
```javascript
import { KeySerializedMap } from '@ramirafrafi/structures';

const map = new KeySerializedMap<Record<number, number>, string>();

map.set({ 2: 0, 3: 1 }, 'value');

map.get({ 2: 0, 3: 1 }) // -> returns "value"
map.get({ 3: 1, 2: 0 }) // -> returns undefined, order is important !!
```

### LazyMap
This data structure makes it possible to call a function and stores its return value in a Map minimizing and simplifying the written code.

**Example:**
```javascript
import { LazyMap } from '@ramirafrafi/structures';

// The returned value will be stored in the LazyMap for the key `todoId`
function resolveValue(todoId: number): Promise<Todo> {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then((res) => res.json());
}

const map = new LazyMap<number, Promise<Todo>>(resolveValue);

let todo: Todo;

todo = await map.get(1); // makes a fetch call and return the response for todo #1
todo = await map.get(2); // makes a fetch call and return the response for todo #2
todo = await map.get(1); // returns the value already fetched in the first call
```
