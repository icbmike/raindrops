export function pairs<T>(a1: T[], a2: T[]): T[][] {
    let result: T[][] = [];

    for (let i = 0; i < a1.length; i++) {
        const ai = a1[i];

        for (let j = 0; j < a2.length; j++) {
            const aj = a2[j];

            result.push([ai, aj]);
        }
    }

    return result;
}
