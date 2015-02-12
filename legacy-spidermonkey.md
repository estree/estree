# Statements

```js
extend interface ForInStatement {
   ...,
   each: boolean;
}
```

```js
interface LetStatement <: Statement {
    type: "LetStatement";
    head: [ VariableDeclarator ];
    body: Statement;
}
```

# Expressions


```js
interface ComprehensionExpression <: Expression {
    type: "ComprehensionExpression";
    body: Expression;
    blocks: [ ComprehensionBlock ];
    filter: Expression | null;
}
```

```js
interface GeneratorExpression <: Expression {
    type: "GeneratorExpression";
    body: Expression;
    blocks: [ ComprehensionBlock ];
    filter: Expression | null;
}
```

```js
interface GraphExpression <: Expression {
    type: "GraphExpression";
    index: uint32;
    expression: Literal;
}
```

```js
interface GraphIndexExpression <: Expression {
    type: "GraphIndexExpression";
    index: uint32;
}
```

```js
interface LetExpression <: Expression {
    type: "LetExpression";
    head: [ VariableDeclarator ];
    body: Expression;
}
```

# Clauses

```js
extend interface CatchClause {
    guard: Expression | null;
}
```

```js
interface ComprehensionBlock <: Node {
    type: "ComprehensionBlock";
    left: Pattern;
    right: Expression;
    each: boolean;
}
```

# E4X

## Declarations

```js
interface XMLDefaultDeclaration <: Declaration {
    type: "XMLDefaultDeclaration";
    namespace: Expression;
}
```

## Expressions

```js
interface XMLAnyName <: Expression {
    type: "XMLAnyName";
}
```

```js
interface XMLQualifiedIdentifier <: Expression {
    type: "XMLQualifiedIdentifier";
    left: Identifier | XMLAnyName;
    right: Identifier | Expression;
    computed: boolean;
}
```

```js
interface XMLFunctionQualifiedIdentifier <: Expression {
    type: "XMLFunctionQualifiedIdentifier";
    right: Identifier | Expression;
    computed: boolean;
}
```

```js
interface XMLAttributeSelector <: Expression {
    type: "XMLAttributeSelector";
    attribute: Expression;
}
```

```js
interface XMLFilterExpression <: Expression {
    type: "XMLFilterExpression";
    left: Expression;
    right: Expression;
}
```

```js
interface XMLElement <: XML, Expression {
    type: "XMLElement";
    contents: [ XML ];
}
```

```js
interface XMLList <: XML, Expression {
    type: "XMLList";
    contents: [ XML ];
}
```

## XML

```js
interface XML <: Node { }
```

```js
interface XMLEscape <: XML {
    type: "XMLEscape";
    expression: Expression;
}
```

```js
interface XMLText <: XML {
    type: "XMLText";
    text: string;
}
```

```js
interface XMLStartTag <: XML {
    type: "XMLStartTag";
    contents: [ XML ];
}
```

```js
interface XMLEndTag <: XML {
    type: "XMLEndTag";
    contents: [ XML ];
}
```

```js
interface XMLPointTag <: XML {
    type: "XMLPointTag";
    contents: [ XML ];
}
```

```js
interface XMLName <: XML {
    type: "XMLName";
    contents: string | [ XML ];
}
```

```js
interface XMLAttribute <: XML {
    type: "XMLAttribute";
    value: string;
}
```

```js
interface XMLCdata <: XML {
    type: "XMLCdata";
    contents: string;
}
```

```js
interface XMLComment <: XML {
    type: "XMLComment";
    contents: string;
}
```

```js
interface XMLProcessingInstruction <: XML {
    type: "XMLProcessingInstruction";
    target: string;
    contents: string | null;
}
```
