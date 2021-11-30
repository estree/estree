# [class.hasInstance](https://github.com/tc39/proposal-class-brand-check)

## ClassExpression

```js
interface Class <: Node {
    type: "Class"
}
```

```js
extend interface CallExpression {
    callee: Class // currently only class
    arguments: [ Expression ]
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
