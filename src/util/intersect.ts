
import { dot, Down, Left, Right, unit, Up, Vector } from "./vector";

interface Rect {
    x:number;
    y:number;
    width:number;
    height:number;
}

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export type Side = 'Top' | 'Bottom' | 'Left' | 'Right';

export interface RectSide extends Line {
    side: Side;
}

function topLine(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y,
        side: 'Top'
    }
}

function leftLine(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x,
        y2: rect.y + rect.height,
        side: 'Left'
    }
}

function rightLine(rect: Rect) : RectSide {
    return {
        x1: rect.x + rect.width,
        y1: rect.y,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        side: 'Right'
    }
}

function bottomLine(rect: Rect) : RectSide {
    return {
        x1: rect.x,
        y1: rect.y + rect.height,
        x2: rect.x + rect.width,
        y2: rect.y + rect.height,
        side: 'Bottom'
    }
}

const intersects = (side: RectSide, line: Line) : boolean => {
    const horizontalLine = (side.side == 'Top' || side.side == 'Bottom') ? side : line;
    const verticalLine = (side.side == 'Top' || side.side == 'Bottom') ? line : side;

    return verticalLine.x1 >= horizontalLine.x1 
        && verticalLine.x1 <= horizontalLine.x2
        
        && horizontalLine.y1 >= verticalLine.y1
        && horizontalLine.y1 <= verticalLine.y2;
}

export const findCollisions = (rects: Rect[], source: Rect, moveVector: Vector) : RectSide[] => {
    const collisions = []
    
    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];

        // Is it moving horizontally
        if(dot(unit(moveVector), Left) > 0){
            const rightSide = rightLine(rect);

            if(intersects(rightSide, {
                x1: source.x + moveVector.x,
                y1: source.y + source.height / 2,
                x2: source.x,
                y2: source.y + source.height / 2,
            })){
                collisions.push(rightSide);
            }
        } else if(dot(unit(moveVector), Right) > 0) {
            const leftSide = leftLine(rect);

            if(intersects(leftSide, {
                x1: source.x + source.width,
                y1: source.y + source.height / 2,
                x2: source.x + source.width + moveVector.x,
                y2: source.y + source.height / 2,
            })){
                collisions.push(leftSide);
            }
        }

        // Is it moving vertically
        if(dot(unit(moveVector), Up) > 0){
            const bottomSide = bottomLine(rect);

            if(intersects(bottomSide, {
                x1: source.x + source.width / 2,
                y1: source.y + moveVector.y,
                x2: source.x + source.width / 2,
                y2: source.y,
            })){
                collisions.push(bottomSide);
            }
        } else if(dot(unit(moveVector), Down) > 0) {
            const topSide = topLine(rect);

            if(intersects(topSide, {
                x1: source.x + source.width / 2,
                y1: source.y + source.height,
                x2: source.x + source.width / 2,
                y2: source.y + source.height + moveVector.y,
            })){
                collisions.push(topSide);
            }
        }
    }

    return collisions;
}