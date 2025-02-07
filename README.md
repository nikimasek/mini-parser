# Small Parser

Minimalist parser with post processing.

## Example

```JavaScript
const example = parser(
    rule(
        /\d+/, (a, b) => a + +b,
        repeat(
            rule(
                /[-+]/, (x, y) => x * (y == '-' ? -1 : 1),
                rule(/\d+/, (_, x) => +x, end())),
            (_, x) => x.reduce((a, b) => a + b, 0),
            0, Infinity,
            end(true)
        )));

console.log(example('3+4-2+5+2'))
```