import { size, subtract, Vector } from "./vector";

export interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface LineWithNormal extends Line {
    normal: Vector
}

export function lineLength(line: Line) {
    return size(subtract({
        x: line.x2,
        y: line.y2
    }, {
        x: line.x1,
        y: line.y1
    }));
}