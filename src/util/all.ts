export const all = <T>(arr: T[], predicate: (item: T) => boolean) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if(!predicate(item)){
            return false;
        }
    }

    return true;
}