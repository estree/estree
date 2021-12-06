# [class.hasInstance](https://github.com/tc39/proposal-class-brand-check)

## ClassExpression

```js
extend interface CallExpression {
    callee: ClassObject; 
    optional: false;
    arguments: [ AssignmentExpression ];
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
