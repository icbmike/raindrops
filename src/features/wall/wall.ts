export interface Wall {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const initialWalls: Wall[] = [
    {
        x: 0,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 0,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 800,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 0,
        y: 800,
        height: 10,
        width: 600
    },

    {
        x: 1200,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 1200,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 2000,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 1200,
        y: 800,
        height: 10,
        width: 810
    },
];