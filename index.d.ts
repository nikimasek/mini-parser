export const end: unique symbol;

export type Rule<T> = {
    push(...rules: (Rule<T> | typeof end)[]): void;
}

export function rule<T>(pattern: string, map: (this: T, value: string) => void, ...roles: Rule<T>[]): Rule<T>;
export function rule<T>(pattern: RegExp, map: (this: T, ...groups: string[]) => void, ...rules: Rule<T>[]): Rule<T>;

export function parser<T>(rule: Rule<T>): (input: string, self: T) => boolean;