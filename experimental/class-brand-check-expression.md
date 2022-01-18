# [class.hasInstance](https://github.com/tc39/proposal-class-brand-check)

## ClassExpression

```js
extend interface classHasInstanceExpression <: Expression {
    type: "classHasInstanceExpression",
    source: Expression
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
- 
