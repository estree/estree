# [BigInt](https://github.com/tc39/proposal-bigint)

```js
extend interface Literal {
  value: string | boolean | null | number | RegExp | bigint;
}

interface BigIntLiteral <: Literal {
  value: bigint | null;
  bigint: string;
}
```
