# [Hashbang Grammar]

## Programs

```js
extend interface Program {
    interpreter: InterpreterDirective | null
}
```

### InterpreterDirective

```js
interface InterpreterDirective <: Node {
    type: "InterpreterDirective";
    value: string;
}
```

The `value` of an intepreter directive is the content without `#!` prefix, e.g. `/usr/bin/env node`.

[hashbang grammar]: https://github.com/tc39/proposal-hashbang
