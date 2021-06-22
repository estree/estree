# [Pattern Matching](proposal-pattern-matching)

See also [AST examples](ast-examples) for this proposal.

## MatchExpression

```js
interface MatchExpression <: Expression {
    type: "MatchExpression";
    discriminant: Expression;
    id: Pattern | null;
    clauses: [ MatchClause ]
}
```

## WhenClause
```js
interface MatchClause <: Node {
    type: "MatchClause";
    test: MatchPattern | null;
    guard: Expression | null;
    id: Pattern | null;
    consequent: BlockStatement
}
```

If `test` is `null`, `id` must be `null`.

## MatchPattern
```js
interface MatchPattern <: Node {}
```

## ArrayMatchPattern
```js
interface ArrayMatchPattern <: MatchPattern {
    type: "ArrayMatchPattern";
    elements: [ MatchPattern ];
}
```

## ObjectMatchPattern
```js
interface AssignmentMatchProperty <: Property {
    type: "Property"; // inherited
    value: MatchPattern;
    kind: "init";
    method: false;
}

interface ObjectMatchPattern <: MatchPattern {
    type: "ObjectMatchPattern";
    properties: [ AssignmentMatchProperty ];
}
```

## RestMatchElement
```js
interface RestMatchElement <: MatchPattern {
    type: "RestMatchElement";
    argument: MatchPattern;
}
```

## BinaryMatchPattern
```js
interface BinaryMatchPattern <: MatchPattern {
    type: "BinaryPattern";
    operator: "and" | "or" | "with";
    left: MatchPattern;
    right: MatchPattern;
}
```

## AsMatchPattern
```js
interface AsMatchPattern <: MatchPattern {
    type: "AsMatchPattern";
    test: MatchPattern;
    id: Pattern;
}
```

## ExpressionMatchPattern
```js
interface ExpressionMatchPattern <: MatchPattern {
    type: "ExpressionMatchPattern";
    expression: Expression;
}
```

## NullMatchPattern
```js
interface NullMatchPattern <: MatchPattern {
    type: "NullMatchPattern";
}
```

# Literal

```js
extend interface Literal <: Expression, MatchPattern {}
```

# Identifier
```js
extend interface Identifier <: Expression, Pattern, MatchPattern {}
```

### UnaryExpression

```js
extend interface UnaryExpression <: Expression, MatchPattern {}
```

If a UnaryExpression is a MatchPattern, its `operator` must be `"-"`, its `prefix` must be `true`, and its `argument` must be either a Literal with numeric value, or an identifier named `"Infinity"`.

[proposal-pattern-matching]: https://tc39.es/proposal-pattern-matching/
[ast-examples]: https://gist.github.com/JLHwung/d2b64364dc63757282cef182367b4e84
