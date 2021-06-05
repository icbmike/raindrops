import { any } from "../util/any";
import { linesIntersect } from "./line-intersection";
import { pairs } from "./pairs";
import { Point } from "./Point";
import { bottomSide as bottomSideFn, leftSide as leftSideFn, Rect, RectSide, rightSide as rightSideFn, topSide as topSideFn } from "./Rect";
import { Vector } from "./vector";

const rectsIntersect = (r1: Rect, r2: Rect) => {
    return pairs(
        [topSideFn(r1), bottomSideFn(r1)],
        [leftSideFn(r2), rightSideFn(r2)]
    ).concat(pairs(
        [leftSideFn(r1), rightSideFn(r1)],
        [topSideFn(r2), bottomSideFn(r2)]
    )).filter(([l1, l2]) => linesIntersect(l1, l2));
}

const rectPoints = (r: Rect) : Point[] => {
    return [
        {x: r.x, y: r.y}, 
        {x: r.x, y: r.y + r.height},
        {x: r.x + r.width, y: r.y}, 
        {x: r.x + r.width, y: r.y +r.height},
    ];
}

const rectBoundsPoint = (r:Rect, p:Point) : boolean => 
    p.x > r.x && p.x < r.x + r.width
        && p.y > r.y && p.y > r.y + r.height; 

const rectsOverlap = (r1: Rect, r2: Rect) => 
        any(rectsIntersect(r1, r2)) || 
        any(rectPoints(r1), p => rectBoundsPoint(r2, p)) || 
        any(rectPoints(r2), p => rectBoundsPoint(r1, p));

const boundingRect = (r1: Rect, r2: Rect): Rect => {
    return {
        x: Math.min(r1.x, r2.x),
        y: Math.min(r1.y, r2.y),
        width: Math.max(r1.x + r1.width, r2.x + r2.width) - Math.min(r1.x, r2.x),
        height: Math.max(r1.y + r1.height, r2.y + r2.height) - Math.min(r1.y, r2.y)
    };
}

export const findCollisions = (rects: Rect[], source: Rect, moveVector: Vector): RectSide[] => {
    const collisions: RectSide[] = [];
    const movedSource = {
        ...source,
        x: source.x + moveVector.x,
        y: source.y + moveVector.y
    }

    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];

        // Get a rect of the starting position and final position
        var deltaBoundingRect = boundingRect(source, movedSource);

        const deltaBoundingRectOverlaps = rectsOverlap(rect, deltaBoundingRect);

        console.log(deltaBoundingRectOverlaps);
        if(!deltaBoundingRectOverlaps)
            continue;

        const movementIntersections = rectsIntersect(rect, movedSource);

        if(!any(movementIntersections)){
            console.log('tunneling');
        }

        if(moveVector.y != 0 && any(movementIntersections, ([side1, _]) => side1.side == 'Top' || side1.side == 'Bottom')) {
            const sideCollidedWith = moveVector.y > 0
                ? topSideFn(rect)
                : bottomSideFn(rect)

            collisions.push(sideCollidedWith);
        }

        if(moveVector.x != 0 && any(movementIntersections, ([side1, _]) => side1.side == 'Left' || side1.side == 'Right')) {
            const sideCollidedWith = moveVector.x > 0
                ? leftSideFn(rect)
                : rightSideFn(rect)

            collisions.push(sideCollidedWith);
        }
    }

    return collisions;
}