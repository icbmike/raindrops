import { Line } from "./Line";

export type Side = 'Top' | 'Bottom' | 'Left' | 'Right';

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface RectSide extends Line {
    side: Side;
}

export function topSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y,
        side: 'Top'
    }
}

export function leftSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x,
        y2: rect.y + rect.height,
        side: 'Left'
    }
}

export function rightSide(rect: Rect) : RectSide {
    return {
        x1: rect.x + rect.width,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        side: 'Right'
    }
}

export function bottomSide(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y + rect.height,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        side: 'Bottom'
    }
}
