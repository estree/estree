# [class static initialization blocks][proposal-class-static-block]

## ClassBody

```js
extend interface ClassBody {
    body: [ MethodDefinition | PropertyDefinition | StaticBlock ];
}
```
- `body` has at most one `StaticBlock`.

## StaticBlock

```js
interface StaticBlock <: BlockStatement {
    type: "StaticBlock"
}
```

A static block `static { }` is a block statement served as an additional static initializer.

[proposal-class-static-block]: https://github.com/tc39/proposal-class-static-block
