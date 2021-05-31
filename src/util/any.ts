interface Predicate<T>{
    (it: T) : boolean;
}

export function any<T>(arr: T[]) : boolean;
export function any<T>(arr: T[], predicate: Predicate<T>) : boolean;

export function any<T>(arr: T[], predicate?: Predicate<T>) : boolean {
    if(!arr)
        return false;

    return !!predicate
        ? arr.filter(predicate).length > 0
        : arr.length > 0;
}
