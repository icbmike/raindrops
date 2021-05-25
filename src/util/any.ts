interface Predicate<T>{
    (it: T) : boolean;
}

export function any<T>(arr: T[], predicate: Predicate<T>) : boolean {
    return arr.filter(predicate).length > 0;
}