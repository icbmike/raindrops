export interface Wall {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const walls: Wall[] = [
    // {
    //     x: 0,
    //     y: 0,
    //     width: 10,
    //     height: 800
    // },
    // {
    //     x: 0,
    //     y: 0,
    //     width: 800,
    //     height: 10
    // },
    {
        x: 400,
        y: 100,
        height: 600,
        width: 10
    },
    {
        x: 200,
        y: 400,
        height: 10,
        width: 400
    },
];