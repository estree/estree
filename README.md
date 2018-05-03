# The ESTree Spec

Once upon a time, an [unsuspecting Mozilla engineer](http://calculist.org) created an API in Firefox that exposed the SpiderMonkey engine's JavaScript parser as a JavaScript API. Said engineer [documented the format it produced](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API), and this format caught on as a lingua franca for tools that manipulate JavaScript source code.

Meanwhile JavaScript is evolving, notably with the upcoming release of ES2015. This site will serve as a community standard for people involved in building and using these tools to help evolve this format to keep up with the evolution of the JavaScript language.

# Discussion

We've started the process of bringing together various communities using this format to move it forward into the ES2015 era and beyond. Feel free to join us! We'll be discussing in the issue tracker and in `#esprima` on Freenode.

# AST Descriptor Syntax

The spec uses a custom syntax to describe its structures.  For example, at the
time of writing, 'es2015.md' contained a description of `Program` as seen below

```js
extend interface Program {
    sourceType: "script" | "module";
    body: [ Statement | ModuleDeclaration ];
}
```

# Participating Members

* Dave Herman (Mozilla)
* Ingvar Stepanyan ([Acorn](https://github.com/ternjs/acorn))
* [Nicholas C. Zakas](https://github.com/nzakas) ([ESLint](https://github.com/eslint))
* [Mike Sherov](https://github.com/mikesherov),  [Ariya Hidayat](https://github.com/ariya) ([Esprima](https://github.com/jquery/esprima))
* Michael Ficarra ([@michaelficarra](https://github.com/michaelficarra))
* [Henry Zhu](https://github.com/hzoo), [Logan Smyth](https://github.com/loganfsmyth), [Daniel Tschinder](https://github.com/danez) ([Babel](https://github.com/babel))

# Inactive Members

* Sebastian McKenzie ([Babel](https://github.com/babel/babel))
* Kyle Simpson ([@getify](https://github.com/getify))

# Philosophy

Suggested additions and modifications must follow these guidelines:

1. **Backwards compatible:** Non-additive modifications to existing constructs will not be considered unless immense support is in favor of such changes. (eg. [#65](https://github.com/estree/estree/issues/65))
2. **Contextless:** Nodes should not retain any information about their parent. ie. a `FunctionExpression` should not be aware of if it's a concise method. (eg. [#5](https://github.com/estree/estree/issues/5))
3. **Unique:** Information should not be duplicated. ie. a `kind` property should not be present on `Literal` if the type can be discerned from the `value`. (eg. [#61](https://github.com/estree/estree/issues/61))
4. **Extensible:** New nodes should be specced to easily allow future spec additions. This means expanding the coverage of node types. ie. `MetaProperty` over `NewTarget` to cover future meta properties. (eg. [#32](https://github.com/estree/estree/pull/32))
