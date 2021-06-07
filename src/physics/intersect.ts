import { any } from "../util/any";
import { linesIntersect } from "./line-intersection";
import { pairs } from "./pairs";
import { Point } from "./Point";
import { bottomSide as bottomSideFn, leftSide as leftSideFn, Rect, rectPoints, RectSide, rightSide as rightSideFn, topSide as topSideFn } from "./Rect";
import { dot, Vector } from "./vector";

const rectsIntersect = (r1: Rect, r2: Rect) => {
    return pairs(
        [topSideFn(r1), bottomSideFn(r1)],
        [leftSideFn(r2), rightSideFn(r2)]
    ).concat(pairs(
        [leftSideFn(r1), rightSideFn(r1)],
        [topSideFn(r2), bottomSideFn(r2)]
    )).filter(([l1, l2]) => linesIntersect(l1, l2));
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
        }
        
        // Filter possible collisions sides by their surface normal
        const possibileSides = [topSideFn(rect), bottomSideFn(rect), leftSideFn(rect), rightSideFn(rect)]
            .filter(rectSide => dot(rectSide.normal, moveVector) < 0);

        if(possibileSides.length == 1) {
            collisions.push(possibileSides[0]);
        } else {
            // Moving diagonally
            // Need to find which side we collide with first

            if(moveVector.x < 0 && moveVector.y < 0){
                const timeXCollision = Math.abs((leftSideFn(source).x1 - rightSideFn(rect).x1) / moveVector.x);
                const timeYCollision = Math.abs((topSideFn(source).y1 - bottomSideFn(rect).y1) / moveVector.y);

                if(timeXCollision > timeYCollision){
                    collisions.push(bottomSideFn(rect))
                }else {
                    collisions.push(rightSideFn(rect))
                }
            } else if (moveVector.x > 0 && moveVector.y < 0){
                const timeXCollision = Math.abs((leftSideFn(rect).x1 - rightSideFn(source).x1) / moveVector.x);
                const timeYCollision = Math.abs((topSideFn(source).y1 - bottomSideFn(rect).y1) / moveVector.y);

                if(timeXCollision > timeYCollision){
                    collisions.push(bottomSideFn(rect))
                }else {
                    collisions.push(leftSideFn(rect))
                }
            } else if(moveVector.x < 0 && moveVector.y > 0) {
                const timeXCollision = Math.abs((leftSideFn(source).x1 - rightSideFn(rect).x1) / moveVector.x);
                const timeYCollision = Math.abs((topSideFn(rect).y1 - bottomSideFn(source).y1) / moveVector.y);

                if(timeXCollision > timeYCollision){
                    collisions.push(topSideFn(rect))
                }else {
                    collisions.push(rightSideFn(rect))
                }
            } else {
                const timeXCollision = Math.abs((leftSideFn(rect).x1 - rightSideFn(source).x1) / moveVector.x);
                const timeYCollision = Math.abs((topSideFn(rect).y1 - bottomSideFn(source).y1) / moveVector.y);

                if(timeXCollision > timeYCollision){
                    collisions.push(topSideFn(rect))
                }else {
                    collisions.push(leftSideFn(rect))
                }
            }
        }
    }

    return collisions;
}