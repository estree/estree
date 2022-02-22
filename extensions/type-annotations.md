<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
This document specifies the extensions to the [core ESTree AST types](es5.md) to support type annotations.

- [Type Annotations](#typeannotations)
- [Identifier](#identifier)
- [Functions](#functions)
- [Patterns](#patterns)
  - [ObjectPattern](#objectpattern)
  - [ArrayPattern](#arraypattern)
  - [RestElement](#restelement)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Type Annotations

```ts
interface TypeAnnotation <: Node { }
```

Any type annotation.

# Identifier

```ts
extend interface Identifier {
    typeAnnotation: TypeAnnotation | null;
}
```

The `typeAnnotation` property is used only in the case of variable declarations with type annotations or function arguments with type annotations.

# Functions

```ts
extend interface Function {
    returnType: TypeAnnotation | null;
}
```

The `returnType` property is used to specify the type annotation for the return value of the function.

# Patterns

## ObjectPattern

```ts
extend interface ObjectPattern {
    typeAnnotation: TypeAnnotation | null;
}
```

## ArrayPattern

```ts
extend interface ArrayPattern {
    typeAnnotation: TypeAnnotation | null;
}
```

## RestElement

```ts
extend interface RestElement {
    typeAnnotation: TypeAnnotation | null;
}
```
