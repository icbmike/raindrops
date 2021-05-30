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
        x: 300,
        y: 0,
        height: 600,
        width: 10
    },
    {
        x: 0,
        y: 800,
        height: 10,
        width: 400
    },
];