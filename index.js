function rule(pattern, func, next) {
    return (input) => {
        const matched = pattern.exec(input);
        if (!matched || matched.index) return null;
        const rest = input.substring(matched[0].length);
        const x = next(rest);
        if (!x) return null;
        return [func(x[0], ...matched), x[1]];
    }
}

function select(...rules) {
    return (input) => {
        for (const rule of rules) {
            const matched = rule(input);
            if (matched) return matched;
        }
        return null;
    }
}

function repeat(rule, func, min, max, next) {
    return (input) => {
        const result = [];
        let i = 0, value;
        while (i++ <= max) {
            const matched = rule(input);
            if (!matched) break;
            [value, input] = matched;
            result.push(value);
        }
        if (result.length < min) return null;
        const matched = next(input);
        return matched ? [func(matched[0], result), matched[1]] : null;
    }
}

function end(eof = false) {
    return (input) => (eof && input.length != 0) ? null : [null, input];
}

function parser(rule) {
    return (input) => {
        const matched = rule(input);
        if (!matched || matched[1].length) return null;
        return matched[0];
    }
}