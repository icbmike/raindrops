import { Line } from "./Line";
import { Point } from "./Point";
import { Left, Right, Up, Down, Vector } from "./vector";

export type Side = 'Top' | 'Bottom' | 'Left' | 'Right';

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface RectSide extends Line {
    normal: Vector;
    side: Side
}

export function topSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y,
        normal: Up,
        side: "Top"
    }
}

export function leftSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x,
        y2: rect.y + rect.height,
        normal: Left,
        side: "Left"
    }
}

export function rightSide(rect: Rect) : RectSide {
    return {
        x1: rect.x + rect.width,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        normal: Right,
        side: 'Right'
    }
}

export function bottomSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y + rect.height,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        normal: Down,
        side: 'Bottom'
    }
}

export const rectPoints = (r: Rect) : Point[] => {
    return [
        {x: r.x, y: r.y}, 
        {x: r.x, y: r.y + r.height},
        {x: r.x + r.width, y: r.y}, 
        {x: r.x + r.width, y: r.y +r.height},
    ];
}