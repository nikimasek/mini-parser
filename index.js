export const end = Symbol();

export function rule() {
    return [...arguments];
}

export function parser(rule) {
    function match(self, input, rule) {
        if (rule === end) return input.length == 0 ? [] : null;
        let matched;
        if (typeof rule[0] == 'string') {
            if (!input.startsWith(rule[0])) return null;
            matched = [rule[0]];
        } else if (rule[0] instanceof RegExp) {
            const x = input.match(rule[0]);
            if (!x || x.index != 0) return null;
            matched = [...x];
        } else
            return null;
        const rest = input.substring(matched[0].length);
        const tail = rule.slice(2).reduce((result, rule) => result || match(self, rest, rule), null);
        if (tail == null) return null;
        tail.unshift(rule[1].bind(self, ...matched));
        return tail;
    }
    return (input, self) => {
        const result = match(self, input, rule);
        result?.forEach(Reflect.apply);
        return Boolean(result);
    };
}