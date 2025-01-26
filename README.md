# Mini Parser

Minimalist parser with post processing.

## Example

```JavaScript
const o = rule('(', function () { this.push([]); });
const n = rule(/^-?\d+/, function (x) { this.at(-1).push(+x); });
const p = rule(/^[-+]/, function (x) { this.at(-1).push(x) });
const c = rule(')', function () { this.at(-2).push(this.pop()); });
o.push(n, o);
n.push(p, c, end);
p.push(n, o);
c.push(c, p, end);
const example = [[]];
parser(rule('', () => { }, n, o))('5+(3-6)-2', example);
console.log(example);
// [ [ 5, '+', [ 3, '-', 6 ], '-', 2 ] ]
```