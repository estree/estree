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

## MatchClause

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

While a Match Pattern shares similar structures with a Pattern, it is different from a Pattern:

- Literals or negative numbers are match patterns, but they are not patterns
- Any expression can be converted to an expression match pattern
- Multiple match patterns can be joined with `and`, `or` and `with` operators, but patterns can not
- Unlike array and object patterns, assignment patterns have no corresponding syntax in match patterns

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
    type: "BinaryMatchPattern";
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
