import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { any } from '../../util/any';
import { groupBy } from '../../util/group-by';
import { findCollisions } from '../../physics/intersect';
import { scale, size } from '../../physics/vector';
import { World } from '../worldstate';
import { vectorFromInput } from '../input/vectorFromInput';
import { Collidable } from '../../physics/Collidable';

export const rectReducer = 
    on('UpdateAction', (current: World, action: UpdateAction) => {
        const { delta } = action.payload;
        const { player: rect} = current;

        const inputVector = vectorFromInput(current.input);
        const moveVector = scale(inputVector, delta * 0.5);

        if(size(moveVector) == 0){
            return {
                ...current
            }
        }

        let newX;
        let newY;

        const collidables = current.gameEntities.flatMap(ge => {
            const c = ge.getComponent<Collidable>('Collidable');

            return c?.collisionEnabled() ? [c] : [];
        })

        const collisions = findCollisions([...collidables], rect, moveVector);

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
