export type Grouping<T, K extends string> = { [key in K]?: T[] };

export const groupBy = <T, K extends string>(arr: T[], selector: (item:T) => K) : Grouping<T, K>  => {
    let grouping: Grouping<T, K> = {};
    
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        
        const key = selector(item);

        if(grouping[key]){
            (grouping[key] as T[]).push(item);
        }else {
            grouping[key] = [item];
        }
    }

    return grouping;
}