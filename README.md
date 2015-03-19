# The ESTree Spec

Once upon a time, an [unsuspecting Mozilla engineer](http://calculist.org) created an API in Firefox that exposed the SpiderMonkey engine's JavaScript parser as a JavaScript API. Said engineer [documented the format it produced](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API), and this format caught on as a lingua franca for tools that manipulate JavaScript source code.

Meanwhile JavaScript is evolving, notably with the upcoming release of ES6. This site will serve as a community standard for people involved in building and using these tools to help evolve this format to keep up with the evolution of the JavaScript language.

# Discussion

We've started the process of bringing together various communities using this format to move it forward into the ES6 era and beyond. Feel free to join us! We'll be discussing in the issue tracker and in `#esprima` on Freenode.

# Participating Members

* Dave Herman (Mozilla)
* Ingvar Stepanyan ([Acorn](https://github.com/marijnh/acorn))
* Mike Sherov ([Esprima](https://github.com/jquery/esprima))
* Michael Ficarra ([@michaelficarra](https://github.com/michaelficarra))
* Sebastian McKenzie ([Babel](https://github.com/babel/babel))
* Kyle Simpson ([@getify](https://github.com/getify))

# Philosophy

Suggested additions and modifications must follow these guidelines:

1. **Backwards compatible:** Non-additive modifications to existing constructs will not be considered unless immense support is in favor of such changes. ([eg. #65](https://github.com/estree/estree/issues/65))
2. **Contextless:** Nodes should not retain any information about their parent. ie. a `FunctionExpression` should not be aware of if it's a concise method. (eg. [#5](https://github.com/estree/estree/issues/5))
3. **Unique:** Information should not be duplicated. ie. a `kind` property should not be present on `Literal` if the type can be discerned from the `value`. (eg. [#61](https://github.com/estree/estree/issues/61))
4. **Extensible:** New nodes should be specced to easily allow future spec additions. This means expanding the coverage of node types. ie. `MetaProperty` over `NewTarget` to cover future meta properties. (eg. [#32](https://github.com/estree/estree/pull/32))
