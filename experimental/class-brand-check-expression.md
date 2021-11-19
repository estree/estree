# [class.hasInstance](https://github.com/tc39/proposal-class-brand-check)

## ClassExpression

```js
extend interface ClassExpression {
    operation: Identifier | null // operation.name currently only has : 'hasInstance'
}
```

eg :

```js
class Foo {
    bar(instance){
        if (class.hasInstance(instance)) return true
    }
}
```
