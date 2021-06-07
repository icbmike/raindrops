export const replace = <T>(arr: T[], index: number, item: T) : T[] =>
    [...arr.slice(0, index), item, ...arr.slice(index + 1)];