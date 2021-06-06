import { any } from "../util/any";
import { linesIntersect } from "./line-intersection";
import { pairs } from "./pairs";
import { Point } from "./Point";
import { bottomSide as bottomSideFn, leftSide as leftSideFn, Rect, RectSide, rightSide as rightSideFn, topSide as topSideFn } from "./Rect";
import { dot, Left, Vector } from "./vector";

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
        && p.y > r.y && p.y < r.y + r.height; 

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

        const isCollision = rectsOverlap(rect, movedSource)
        
        if(!isCollision) {
            continue;
        }else {
            console.log('collision');
        }
        
        const possibileSides = [topSideFn(rect), bottomSideFn(rect), leftSideFn(rect), rightSideFn(rect)]
            .filter(rectSide => dot(rectSide.normal, moveVector) < 0);

        if(possibileSides.length == 1) {
            collisions.push(possibileSides[0]);
        } else {

        }
    }

    return collisions;
}