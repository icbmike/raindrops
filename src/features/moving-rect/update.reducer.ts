import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { any } from '../../util/any';
import { groupBy } from '../../util/group-by';
import { findCollisions } from '../../physics/intersect';
import { scale } from '../../physics/vector';
import { WorldState } from '../worldstate';
import { vectorFromInput } from '../../input/vectorFromInput';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { delta } = action.payload;
        const { rect, walls } = current;
        const { canvas } = current.canvasContext;

        const inputVector = vectorFromInput(current.input);
        const moveVector = scale(inputVector, delta);

        const collisions = findCollisions(walls, rect, moveVector);

        if(any(collisions)) {
            const collisionsBySide = groupBy(collisions, i => i.side);
            
            let newX;
            let newY;

            if(collisionsBySide['Top']) {
                newY = collisionsBySide['Top'][0].y1 - rect.height;
            }
            else if(collisionsBySide['Bottom']){
                newY = collisionsBySide['Bottom'][0].y1;
            } 
            else {
                newY = rect.y + moveVector.y;
            }

            if(collisionsBySide['Left']) {
                newX = collisionsBySide['Left'][0].x1 - rect.width;
            }
            else if(collisionsBySide['Right']){
                newX = collisionsBySide['Right'][0].x1;
            } 
            else {
                newX = rect.x + moveVector.x;
            }

            return {
                ...current,
                rect: {
                    ...rect,
                    x: Math.max(0, Math.min(canvas.width - rect.width, newX)),
                    y: Math.max(0, Math.min(canvas.height - rect.height, newY))
                }
            };
        } else {
            const newX = rect.x + moveVector.x;
            const newY = rect.y + moveVector.y;

            return {
                ...current,
                rect: {
                    ...rect,
                    x: Math.max(0, Math.min(canvas.width - rect.width, newX)),
                    y: Math.max(0, Math.min(canvas.height - rect.height, newY))
                }
            };
        }
    }
);
