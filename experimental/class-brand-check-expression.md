# [class.hasInstance](https://github.com/tc39/proposal-class-brand-check)

## ClassHasInstanceExpression

```js
extend interface ClassHasInstanceExpression <: Expression {
    type: "ClassHasInstanceExpression",
    instance: Expression
}    
```

Example:

```js
class Foo {
    bar(instance){
        if (class.hasInstance(instance)) return true
    }
}
```
- 
