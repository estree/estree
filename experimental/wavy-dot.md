# [Wavy Dot](https://github.com/tc39/proposal-wavy-dot)

Extend from the `ChainingExpression` [approach](https://gist.github.com/mysticatea/f3a87f3e02632797ec59d9b447fdf05e).

# Expressions

## ChainingExpression
```ts
extend interface Chain <: Node {
    eventual: boolean
}
```

- For backward compatibility, the first chain element must satisfy either `eventual: true` or `optional: true`.
- `eventual` and `optional` cannot be both `true` but it is subject to change in the future as the proposal is working on optional chaining support.

See also for examples: https://gist.github.com/JLHwung/6ec08a87e4da88874c50788c37d6fdf4