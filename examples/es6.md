This document specifies the extensions to the core ESTree AST types to support the ES6 grammar.

# Functions

You can have generator function declarations

```js
function * a() {}
```

```js
{
    "type": "FunctionDeclaration",
    "id": {
        "type": "Identifier",
        "name": "a"
    },
    "generator": true,
    "expression": false,
    "async": false,
    "params": [],
    "body": {
        "type": "BlockStatement",
        "body": []
    }
}
```

as well as generator function expressions

```js
var a = function * () {}
```

```js
{
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "a"
      },
      "init": {
        "type": "FunctionExpression",
        "id": null,
        "generator": true,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "body": []
        }
      }
    }
  ],
  "kind": "var"
}
```
