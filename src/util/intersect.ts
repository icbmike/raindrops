import { any } from "./any";

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

interface RectSide extends Line {
    side: 'Top' | 'Bottom' | 'Left' | 'Right';
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

const lineIntersects = (side1: RectSide, side2: RectSide) : boolean => {
    const horizontalLine = (side1.side == 'Top' || side1.side == 'Bottom') ? side1 : side2;
    const verticalLine = (side1.side == 'Top' || side1.side == 'Bottom') ? side2 : side1;

    return verticalLine.x1 > horizontalLine.x1 
        && verticalLine.x1 < horizontalLine.x2
        
        && horizontalLine.y1 > verticalLine.y1
        && horizontalLine.y1 < verticalLine.y2;
}

export const findIntersection = (rects: Rect[], source: Rect) : RectSide | undefined => {
    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];
        
        const side: RectSide[] | undefined = [
            [
                leftLine(rect), 
                topLine(source)
            ],
            [
                leftLine(rect), 
                bottomLine(source)
            ],
            [
                rightLine(rect),
                topLine(source)
            ],
            [
                rightLine(rect),
                bottomLine(source)
            ],
            [
                topLine(rect),
                leftLine(source), 
            ],
            [
                bottomLine(rect),
                leftLine(source), 
            ],
            [
                topLine(rect),
                rightLine(source),
            ],
            [
                bottomLine(rect),
                rightLine(source),
            ],
        ].find(([l1, l2]) => lineIntersects(l1, l2))

        if(side)
            return side[0];
    }

    return undefined;
}