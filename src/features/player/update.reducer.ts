import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { any } from '../../util/any';
import { groupBy } from '../../util/group-by';
import { findCollisions } from '../../physics/intersect';
import { scale, size } from '../../physics/vector';
import { WorldState } from '../worldstate';
import { vectorFromInput } from '../input/vectorFromInput';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { delta } = action.payload;
        const { player: rect, walls, doors } = current;

        const inputVector = vectorFromInput(current.input);
        const moveVector = scale(inputVector, delta * 0.5);

        if(size(moveVector) == 0){
            return {
                ...current
            }
        }

        let newX;
        let newY;

        const collisions = findCollisions([...walls, ...doors.filter(d =>d.state == 'Closed')], rect, moveVector);

        if(any(collisions)) {
            const collisionsBySide = groupBy(collisions, i => i.side);
            
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
        } else {
            newX = rect.x + moveVector.x;
            newY = rect.y + moveVector.y;
        }

        return {
            ...current,
            player: {
                ...rect,
                x: newX,
                y: newY
            }
        };
    }
);
