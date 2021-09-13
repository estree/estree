declare module ESTree {
  /**
   * ESTree AST nodes are represented as `Node` objects, which may have any prototype inheritance but which implement this interface.
   */
  interface Node {
    /**
     * A string representing the AST variant type.
     * Each subtype of `Node` is documented below with the specific string of its `type` field.
     * You can use this field to determine which interface a node implements.
     */
    type: string;
    /**
     * The source location information of the node.
     * If the node contains no information about the source location, the field is `null`.
     */
    loc?: SourceLocation;
  }

  interface SourceLocation {
    source?: string;
    /**
     * The position of the first character of the parsed source region
     */
    start: Position;
    /**
     * The position of the first character after the parsed source region
     */
    end: Position;
  }

  interface Position {
    /**
     * Line number (1-indexed)
     */
    line: number;
    /**
     * Column number (0-indexed)
     */
    column: number;
  }

  /**
   * An identifier. Note that an identifier may be an expression or a destructuring pattern.
   */
  interface Identifier extends Expression, Pattern {
    name: string;
  }

  /**
   * A literal token. Note that a literal can be an expression.
   */
  interface Literal extends Expression {
    value?: string | boolean | number | RegExp | bigint;
  }

  interface RegExpLiteral extends Literal {
    /**
     * The `regex` property allows regexes to be represented in environments that don’t
     * support certain flags such as `y` or `u`. In environments that don't support
     * these flags `value` will be `null` as the regex can't be represented natively.
     */
    regex: {
      pattern: string;
      flags: string;
    };
  }

  /**
   * - `bigint` property is a string representation of the `BigInt` value.
   *   It doesn't include the suffix `n`.
   * - In environments that don't support `BigInt` values, the `value` property will be
   *   `null` as the `BigInt` value can't be represented natively.
   */
  interface BigIntLiteral extends Literal {
    bigint: string;
  }

  /**
   * A complete program source tree.
   */
  interface Program extends Node {
    /**
     * Parsers must specify `sourceType` as `"module"` if the source has been parsed as an ES6 module. Otherwise, `sourceType` must be `"script"`.
     */
    sourceType: string;
    body: Array<Directive | Statement | ModuleDeclaration>;
  }

  /**
   * A function [declaration](#functiondeclaration) or [expression](#functionexpression).
   */
  interface Function extends Node {
    id?: Identifier;
    params: Array<Pattern>;
    body: FunctionBody;
    generator: boolean;
    async: boolean;
  }

  /**
   * Any statement.
   */
  interface Statement extends Node {}

  /**
   * An expression statement, i.e., a statement consisting of a single expression.
   */
  interface ExpressionStatement extends Statement {
    expression: Expression;
  }

  /**
   * A directive from the directive prologue of a script or function.
   * The `directive` property is the raw string source of the directive without quotes.
   */
  interface Directive extends Node {
    expression: Literal;
    directive: string;
  }

  /**
   * A block statement, i.e., a sequence of statements surrounded by braces.
   */
  interface BlockStatement extends Statement {
    body: Array<Statement>;
  }

  /**
   * The body of a function, which is a block statement that may begin with directives.
   */
  interface FunctionBody extends BlockStatement {
    body: Array<Directive | Statement>;
  }

  /**
   * An empty statement, i.e., a solitary semicolon.
   */
  interface EmptyStatement extends Statement {}

  /**
   * A `debugger` statement.
   */
  interface DebuggerStatement extends Statement {}

  /**
   * A `with` statement.
   */
  interface WithStatement extends Statement {
    object: Expression;
    body: Statement;
  }

  /**
   * A `return` statement.
   */
  interface ReturnStatement extends Statement {
    argument?: Expression;
  }

  /**
   * A labeled statement, i.e., a statement prefixed by a `break`/`continue` label.
   */
  interface LabeledStatement extends Statement {
    label: Identifier;
    body: Statement;
  }

  /**
   * A `break` statement.
   */
  interface BreakStatement extends Statement {
    label?: Identifier;
  }

  /**
   * A `continue` statement.
   */
  interface ContinueStatement extends Statement {
    label?: Identifier;
  }

  /**
   * An `if` statement.
   */
  interface IfStatement extends Statement {
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
  }

  /**
   * A `switch` statement.
   */
  interface SwitchStatement extends Statement {
    discriminant: Expression;
    cases: Array<SwitchCase>;
  }

  /**
   * A `case` (if `test` is an `Expression`) or `default` (if `test === null`) clause in the body of a `switch` statement.
   */
  interface SwitchCase extends Node {
    test?: Expression;
    consequent: Array<Statement>;
  }

  /**
   * A `throw` statement.
   */
  interface ThrowStatement extends Statement {
    argument: Expression;
  }

  /**
   * A `try` statement. If `handler` is `null` then `finalizer` must be a `BlockStatement`.
   */
  interface TryStatement extends Statement {
    block: BlockStatement;
    handler?: CatchClause;
    finalizer?: BlockStatement;
  }

  /**
   * A `catch` clause following a `try` block.
   */
  interface CatchClause extends Node {
    /**
     *  `null` if the `catch` binding is omitted. E.g., `try { foo() } catch { bar() }`
     */
    param?: Pattern;
    body: BlockStatement;
  }

  /**
   * A `while` statement.
   */
  interface WhileStatement extends Statement {
    test: Expression;
    body: Statement;
  }

  /**
   * A `do`/`while` statement.
   */
  interface DoWhileStatement extends Statement {
    body: Statement;
    test: Expression;
  }

  /**
   * A `for` statement.
   */
  interface ForStatement extends Statement {
    init?: VariableDeclaration | Expression;
    test?: Expression;
    update?: Expression;
    body: Statement;
  }

  /**
   * A `for`/`in` statement.
   */
  interface ForInStatement extends Statement {
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
  }

  /**
   * A `for`/`of` statement.
   */
  interface ForOfStatement extends ForInStatement {
    /**
     * `for-await-of` statements, e.g., `for await (const x of xs) {`
     */
    await: boolean;
  }

  /**
   * Any declaration node. Note that declarations are considered statements; this is because declarations can appear in any statement context.
   */
  interface Declaration extends Statement {}

  /**
   * A function declaration. Note that unlike in the parent interface `Function`, the `id` cannot be `null`.
   */
  interface FunctionDeclaration extends Declaration, Function {
    id: Identifier;
  }

  /**
   * A variable declaration.
   */
  interface VariableDeclaration extends Declaration {
    declarations: Array<VariableDeclarator>;
    kind: string;
  }

  /**
   * A variable declarator.
   */
  interface VariableDeclarator extends Node {
    id: Pattern;
    init?: Expression;
  }

  /**
   * Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.
   */
  interface Expression extends Node {}

  /**
   * A `this` expression.
   */
  interface ThisExpression extends Expression {}

  /**
   * An array expression. An element might be `null` if it represents a hole in a sparse array. E.g. `[1,,2]`.
   */
  interface ArrayExpression extends Expression {
    elements: Array<Expression | SpreadElement>;
  }

  /**
   * An object expression.
   */
  interface ObjectExpression extends Expression {
    properties: Array<Property | SpreadElement>;
  }

  /**
   * A literal property in an object expression can have either a string or number as its `value`. Ordinary property initializers have a `kind` value `"init"`; getters and setters have the kind values `"get"` and `"set"`, respectively.
   */
  interface Property extends Node {
    key: Literal | Identifier | Expression;
    value: Expression;
    kind: string;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
  }

  /**
   * A `function` expression.
   */
  interface FunctionExpression extends Expression, Function {}

  /**
   * A fat arrow function expression, e.g., `let foo = (bar) => { /* body *​/ }`.
   */
  interface ArrowFunctionExpression extends Function, Expression {
    body: FunctionBody | Expression;
    expression: boolean;
  }

  /**
   * A `yield` expression.
   */
  interface YieldExpression extends Expression {
    argument?: Expression;
    delegate: boolean;
  }

  interface AwaitExpression extends Expression {
    argument: Expression;
  }

  /**
   * A `super` pseudo-expression.
   */
  interface Super extends Node {}

  /**
   * Spread expression, e.g., `[head, ...iter, tail]`, `f(head, ...iter, ...tail)`, `{a: 1, ...obj, b: 2}` (ES2018+).
   * **FIXME:** This describes the Esprima and Acorn behaviors, which is not currently aligned with the SpiderMonkey behavior.
   */
  interface SpreadElement extends Node {
    argument: Expression;
  }

  /**
   * A unary operator expression.
   */
  interface UnaryExpression extends Expression {
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
  }

  type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";

  /**
   * An update (increment or decrement) operator expression.
   */
  interface UpdateExpression extends Expression {
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
  }

  type UpdateOperator = "++" | "--";

  /**
   * A binary operator expression.
   */
  interface BinaryExpression extends Expression {
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
  }

  type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "**" | "|" | "^" | "&" | "in" | "instanceof";

  /**
   * An assignment operator expression.
   */
  interface AssignmentExpression extends Expression {
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
  }

  type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "||=" | "&&=" | "??=";

  /**
   * A logical operator expression.
   */
  interface LogicalExpression extends Expression {
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
  }

  type LogicalOperator = "||" | "&&" | "??";

  /**
   * A member expression. If `computed` is `true`, the node corresponds to a computed (`a[b]`) member expression and `property` is an `Expression`. If `computed` is `false`, the node corresponds to a static (`a.b`) member expression and `property` is an `Identifier`.
   */
  interface MemberExpression extends Expression, Pattern, ChainElement {
    object: Expression | Super;
    property: Expression;
    computed: boolean;
  }

  /**
   * - The `ChainExpression` node is the root of optional chaining.
   * - The `ChainExpression` node contains one or more `ChainElement` nodes that are `optional:true`. On the other hand, `ChainElement` nodes that are `optional:true` belong to a `ChainExpression` node.
   * - For backward compatibility, if all `ChainElement` nodes of a chain are `optional:false`, the `ChainExpression` node isn't inserted as the root of the chain.
   * - Evaluation:
   *   - The `ChainExpression` node is evaluated to the result of the `expression` property's node.
   *   - If the `callee|object` property is evaluated to nullish and the `optional` property is `true`, then the node and ancestor nodes are skipped until the closest `ChainExpression` node, and the result of the `ChainExpression` node becomes `undefined`.
   * <details><summary>For Examples:</summary>
   * ```jsonc
   * // obj.aaa.bbb
   * {
   *   "type": "MemberExpression",
   *   "optional": false,
   *   "object": {
   *     "type": "MemberExpression",
   *     "optional": false,
   *     "object": { "type": "Identifier", "name": "obj" },
   *     "property": { "type": "Identifier", "name": "aaa" }
   *   },
   *   "property": { "type": "Identifier", "name": "bbb" }
   * }
   * ```
   * 
   * ```jsonc
   * // obj.aaa?.bbb
   * {
   *   "type": "ChainExpression",
   *   "expression": {
   *     "type": "MemberExpression",
   *     "optional": true,
   *     "object": {
   *       "type": "MemberExpression",
   *       "optional": false,
   *       "object": { "type": "Identifier", "name": "obj" },
   *       "property": { "type": "Identifier", "name": "aaa" }
   *     },
   *     "property": { "type": "Identifier", "name": "bbb" }
   *   }
   * }
   * ```
   * 
   * ```jsonc
   * // obj?.aaa.bbb
   * {
   *   "type": "ChainExpression",
   *   "expression": {
   *     "type": "MemberExpression",
   *     "optional": false,
   *     "object": {
   *       "type": "MemberExpression",
   *       "optional": true,
   *       "object": { "type": "Identifier", "name": "obj" },
   *       "property": { "type": "Identifier", "name": "aaa" }
   *     },
   *     "property": { "type": "Identifier", "name": "bbb" }
   *   }
   * }
   * ```
   * 
   * ```jsonc
   * // obj?.aaa?.bbb
   * {
   *   "type": "ChainExpression",
   *   "expression": {
   *     "type": "MemberExpression",
   *     "optional": true,
   *     "object": {
   *       "type": "MemberExpression",
   *       "optional": true,
   *       "object": { "type": "Identifier", "name": "obj" },
   *       "property": { "type": "Identifier", "name": "aaa" }
   *     },
   *     "property": { "type": "Identifier", "name": "bbb" }
   *   }
   * }
   * ```
   * 
   * ```jsonc
   * // (obj.aaa).bbb
   * {
   *   "type": "MemberExpression",
   *   "optional": false,
   *   "object": {
   *     "type": "MemberExpression",
   *     "optional": false,
   *     "object": { "type": "Identifier", "name": "obj" },
   *     "property": { "type": "Identifier", "name": "aaa" }
   *   },
   *   "property": { "type": "Identifier", "name": "bbb" }
   * }
   * ```
   * 
   * ```jsonc
   * // (obj.aaa)?.bbb
   * {
   *   "type": "ChainExpression",
   *   "expression": {
   *     "type": "MemberExpression",
   *     "optional": true,
   *     "object": {
   *       "type": "MemberExpression",
   *       "optional": false,
   *       "object": { "type": "Identifier", "name": "obj" },
   *       "property": { "type": "Identifier", "name": "aaa" }
   *     },
   *     "property": { "type": "Identifier", "name": "bbb" }
   *   }
   * }
   * ```
   * 
   * ```jsonc
   * // (obj?.aaa).bbb
   * {
   *   "type": "MemberExpression",
   *   "optional": false,
   *   "object": {
   *     "type": "ChainExpression",
   *     "expression": {
   *       "type": "MemberExpression",
   *       "optional": true,
   *       "object": { "type": "Identifier", "name": "obj" },
   *       "property": { "type": "Identifier", "name": "aaa" }
   *     }
   *   },
   *   "property": { "type": "Identifier", "name": "bbb" }
   * }
   * ```
   * 
   * ```jsonc
   * // (obj?.aaa)?.bbb
   * {
   *   "type": "ChainExpression",
   *   "expression": {
   *     "type": "MemberExpression",
   *     "optional": true,
   *     "object": {
   *       "type": "ChainExpression",
   *       "expression": {
   *         "type": "MemberExpression",
   *         "optional": true,
   *         "object": { "type": "Identifier", "name": "obj" },
   *         "property": { "type": "Identifier", "name": "aaa" }
   *       }
   *     },
   *     "property": { "type": "Identifier", "name": "bbb" }
   *   }
   * }
   * ```
   * 
   * </details>
   */
  interface ChainExpression extends Expression {
    expression: ChainElement;
  }

  interface ChainElement extends Node {
    optional: boolean;
  }

  /**
   * A conditional expression, i.e., a ternary `?`/`:` expression.
   */
  interface ConditionalExpression extends Expression {
    test: Expression;
    alternate: Expression;
    consequent: Expression;
  }

  /**
   * A function or method call expression.
   */
  interface CallExpression extends Expression, ChainElement {
    callee: Expression | Super;
    arguments: Array<Expression | SpreadElement>;
  }

  /**
   * A `new` expression.
   */
  interface NewExpression extends Expression {
    callee: Expression;
    arguments: Array<Expression | SpreadElement>;
  }

  /**
   * A sequence expression, i.e., a comma-separated sequence of expressions.
   */
  interface SequenceExpression extends Expression {
    expressions: Array<Expression>;
  }

  /**
   * `ImportExpression` node represents Dynamic Imports such as `import(source)`.
   * The `source` property is the importing source as similar to [ImportDeclaration](#importdeclaration)
   * node, but it can be an arbitrary expression node.
   */
  interface ImportExpression extends Expression {
    source: Expression;
  }

  interface TemplateLiteral extends Expression {
    quasis: Array<TemplateElement>;
    expressions: Array<Expression>;
  }

  interface TaggedTemplateExpression extends Expression {
    tag: Expression;
    quasi: TemplateLiteral;
  }

  /**
   * If the template literal is tagged and the text has an invalid escape, `cooked` will be `null`, e.g., ``tag`\unicode and \u{55}` ``
   */
  interface TemplateElement extends Node {
    tail: boolean;
    value: {
      cooked?: string;
      raw: string;
    };
  }

  /**
   * Destructuring binding and assignment are not part of ES5, but all binding positions accept `Pattern` to allow for destructuring in ES6. Nevertheless, for ES5, the only `Pattern` subtype is [`Identifier`](#identifier).
   */
  interface Pattern extends Node {}

  interface ObjectPattern extends Pattern {
    properties: Array<AssignmentProperty | RestElement>;
  }

  interface AssignmentProperty extends Property {
    /**
     * inherited
     */
    value: Pattern;
    kind: string;
    method: boolean;
  }

  interface ArrayPattern extends Pattern {
    elements: Array<Pattern>;
  }

  interface RestElement extends Pattern {
    argument: Pattern;
  }

  interface AssignmentPattern extends Pattern {
    left: Pattern;
    right: Expression;
  }

  interface Class extends Node {
    id?: Identifier;
    superClass?: Expression;
    body: ClassBody;
  }

  interface ClassBody extends Node {
    body: Array<MethodDefinition>;
  }

  interface MethodDefinition extends Node {
    key: Expression;
    value: FunctionExpression;
    kind: string;
    computed: boolean;
    static: boolean;
  }

  interface ClassDeclaration extends Class, Declaration {
    id: Identifier;
  }

  interface ClassExpression extends Class, Expression {}

  /**
   * `MetaProperty` node represents `new.target` meta property in ES2015+ and `import.meta` in ES2020+
   */
  interface MetaProperty extends Expression {
    meta: Identifier;
    property: Identifier;
  }

  /**
   * A module `import` or `export` declaration.
   */
  interface ModuleDeclaration extends Node {}

  /**
   * A specifier in an import or export declaration.
   */
  interface ModuleSpecifier extends Node {
    local: Identifier;
  }

  /**
   * An import declaration, e.g., `import foo from "mod";`.
   */
  interface ImportDeclaration extends ModuleDeclaration {
    specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>;
    source: Literal;
  }

  /**
   * An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`. The `imported` field refers to the name of the export imported from the module. The `local` field refers to the binding imported into the local module scope. If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.
   */
  interface ImportSpecifier extends ModuleSpecifier {
    imported: Identifier;
  }

  /**
   * A default import specifier, e.g., `foo` in `import foo from "mod.js"`.
   */
  interface ImportDefaultSpecifier extends ModuleSpecifier {}

  /**
   * A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.
   */
  interface ImportNamespaceSpecifier extends ModuleSpecifier {}

  /**
   * An export named declaration, e.g., `export {foo, bar};`, `export {foo} from "mod";` or `export var foo = 1;`.
   * _Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state._
   */
  interface ExportNamedDeclaration extends ModuleDeclaration {
    declaration?: Declaration;
    specifiers: Array<ExportSpecifier>;
    source?: Literal;
  }

  /**
   * An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The `exported` field refers to the name exported in the module. The `local` field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased export, such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.
   */
  interface ExportSpecifier extends ModuleSpecifier {
    exported: Identifier;
  }

  /**
   * An export default declaration, e.g., `export default function () {};` or `export default 1;`.
   */
  interface ExportDefaultDeclaration extends ModuleDeclaration {
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
  }

  interface AnonymousDefaultExportedFunctionDeclaration extends Function {
    id: any;
  }

  interface AnonymousDefaultExportedClassDeclaration extends Class {
    id: any;
  }

  /**
   * An export batch declaration, e.g., `export * from "mod";`.
   */
  interface ExportAllDeclaration extends ModuleDeclaration {
    source: Literal;
    /**
     * Contains an `Identifier` when a different exported name is specified using `as`, e.g., `export * as foo from "mod";`.
     */
    exported?: Identifier;
  }
}