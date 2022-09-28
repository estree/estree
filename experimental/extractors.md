# [Extractors for ECMAScript][proposal-extractors]

## QualifiedName

```js
interface QualifiedName <: Node {
    type: "QualifiedName";
    left: QualifiedName | Identifier;
    right: Identifier;
}
```

## ObjectPattern

```js
extend interface ObjectPattern {
    extractor: QualifiedName | Identifier | null
}
```

## ArrayPattern
```js
extend interface ArrayPattern {
    extractor: QualifiedName | Identifier | null
}
```

[proposal-extractors]: https://github.com/tc39/proposal-extractors