# [Template Elements with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision)

## TemplateElement

```js
interface TemplateElement <: Node {
    value: {
        cooked: string | null;
        raw: string;
    };
}
```
