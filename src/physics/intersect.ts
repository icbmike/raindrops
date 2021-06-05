import { any } from "../util/any";
import { linesIntersect } from "./line-intersection";
import { pairs } from "./pairs";
import { bottomSide as bottomSideFn, leftSide as leftSideFn, Rect, RectSide, rightSide as rightSideFn, topSide as topSideFn } from "./Rect";
import { dot, Down, Left, Right, unit, Up, Vector } from "./vector";

const rectsIntersect = (r1: Rect, r2: Rect) => {
    return pairs(
        [topSideFn(r1), bottomSideFn(r1)],
        [leftSideFn(r2), rightSideFn(r2)]
    ).concat(pairs(
        [leftSideFn(r1), rightSideFn(r1)],
        [topSideFn(r2), bottomSideFn(r2)]
    )).filter(([l1, l2]) => linesIntersect(l1, l2));
}

export const findCollisions = (rects: Rect[], source: Rect, moveVector: Vector): RectSide[] => {
    const collisions: RectSide[] = [];

    for (let i = 0; i < rects.length; i++) {
        const rect = rects[i];

        const collisions2 = rectsIntersect(rect, {
            ...source,
            x: source.x + moveVector.x,
            y: source.y + moveVector.y
        }).map(c => c[0]);

        if (!any(collisions2))
            continue;

        // Is it moving horizontally
        if (dot(unit(moveVector), Left) > 0) {
            if (any(collisions2.filter(c => c.side == 'Right')) || (
                any(collisions2.filter(c => c.side == 'Top'))
                && any(collisions2.filter(c => c.side == 'Bottom'))
            )

            ) {
                collisions.push(rightSideFn(rect));
                
            }
        } else if (dot(unit(moveVector), Right) > 0) {
            if (any(collisions2.filter(c => c.side == 'Left')) || (
                any(collisions2.filter(c => c.side == 'Top'))
                && any(collisions2.filter(c => c.side == 'Bottom'))
            )
            ) {
                collisions.push(leftSideFn(rect));
                
            }
        }

        // Is it moving vertically
        if (dot(unit(moveVector), Up) > 0) {
            if (any(collisions2.filter(c => c.side == 'Bottom')) || (
                any(collisions2.filter(c => c.side == 'Left'))
                && any(collisions2.filter(c => c.side == 'Right'))
            )

            ) {
                collisions.push(bottomSideFn(rect))
                
            }
        } else if (dot(unit(moveVector), Down) > 0) {
            if (any(collisions2.filter(c => c.side == 'Top')) || (
                any(collisions2.filter(c => c.side == 'Left'))
                && any(collisions2.filter(c => c.side == 'Right'))
            )
            ) {
                collisions.push(topSideFn(rect));
            }
        }
    }

    return collisions;
}