# The ESTree Spec

Once upon a time, an [unsuspecting Mozilla engineer](http://calculist.org) created an API in Firefox that exposed the SpiderMonkey engine's JavaScript parser as a JavaScript API. Said engineer [documented the format it produced](https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API), and this format caught on as a lingua franca for tools that manipulate JavaScript source code.

Meanwhile JavaScript is evolving. This site will serve as a community standard for people involved in building and using these tools to help evolve this format to keep up with the evolution of the JavaScript language.

# AST Descriptor Syntax

The spec uses a custom syntax to describe its structures.  For example, at the
time of writing, 'es2015.md' contained a description of `Program` as seen below

```js
extend interface Program {
    sourceType: "script" | "module";
    body: [ Statement | ImportOrExportDeclaration ];
}
```

# ESTree Steering Committee

* [Nicholas C. Zakas](https://github.com/nzakas) ([ESLint](https://github.com/eslint))
* [Ingvar Stepanyan](https://github.com/rreverser) ([Acorn](https://github.com/acornjs/acorn))
* [Junliang Huang](https://github.com/JLHwung) ([Babel](https://github.com/babel))

# Copyright and License

Copyright Mozilla Contributors and ESTree Contributors.

Licensed under [Creative Commons Sharealike](https://creativecommons.org/licenses/by-sa/2.5/).

# Philosophy

Suggested additions and modifications must follow these guidelines:

1. **Backwards compatible:** Non-additive modifications to existing constructs will not be considered unless immense support is in favor of such changes. ([eg. #65](https://github.com/estree/estree/issues/65))
2. **Contextless:** Nodes should not retain any information about their parent. ie. a `FunctionExpression` should not be aware of if it's a concise method. (eg. [#5](https://github.com/estree/estree/issues/5))
3. **Unique:** Information should not be duplicated. ie. a `kind` property should not be present on `Literal` if the type can be discerned from the `value`. (eg. [#61](https://github.com/estree/estree/issues/61))
4. **Extensible:** New nodes should be specced to easily allow future spec additions. This means expanding the coverage of node types. ie. `MetaProperty` over `NewTarget` to cover future meta properties. (eg. [#32](https://github.com/estree/estree/pull/32))


# Acknowledgements

ESTree has benefited from the contributions of many people over the years. We'd like to thank these folks for their significant contributions to this project:

[Sebastian McKenzie](https://github.com/sebmck) ([Babel](https://github.com/babel/babel)), Kyle Simpson ([@getify](https://github.com/getify)), [Mike Sherov](https://github.com/mikesherov) ([Esprima](https://github.com/jquery/esprima)), [Ariya Hidayat](https://github.com/ariya) ([Esprima](https://github.com/jquery/esprima)), [Adrian Heine](https://github.com/adrianheine) ([Acorn](https://github.com/acornjs/acorn)), [Dave Herman](https://github.com/dherman) (SpiderMonkey), Michael Ficarra ([@michaelficarra](https://github.com/michaelficarra)).
