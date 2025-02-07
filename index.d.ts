export type Rule<T> = (input: string) => [value: T, output: string] | null;

export function end(eof: boolean = false): Rule<never>;
export function rule<T, S>(pattern: RegExp, func: (input: S, ...values: string[]) => T, next: Rule<S>): Rule<T>;
export function select<T>(...rules: Rule<T>[]): Rule<T>;
export function repeat<T, R, P>(rule: Rule<R>, func: (next: P, values: R[]) => T, min: number, max: number, next: Rule<P>): Rule<T>;

export function parser<T>(rule: Rule<T>): T | null;