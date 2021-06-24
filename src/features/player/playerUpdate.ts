import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/system';
import { any } from '../../util/any';
import { groupBy } from '../../util/group-by';
import { findCollisions } from '../../physics/intersect';
import { scale, size, Vector } from '../../physics/vector';
import { World } from '../worldstate';
import { vectorFromInput } from '../input/vectorFromInput';
import { Collidable } from '../../physics/Collidable';
import { Player } from './Player';
import { GameEntity } from '../../dooble/GameEntity';

function playerUpdate(player: Player, moveVector: Vector, gameEntities: GameEntity[]): Vector {
    let newX;
    let newY;

    const collidables = gameEntities.flatMap(ge => {
        const c = ge.getComponent<Collidable>('Collidable');

        return c?.collisionEnabled() ? [c] : [];
    })

    const playerCollidable = player.getComponent<Collidable>('Collidable')!;

    const collisions = findCollisions([...collidables], playerCollidable, moveVector);

    if(any(collisions)) {
        const collisionsBySide = groupBy(collisions, i => i.side);
        
        if(collisionsBySide['Top']) {
            newY = collisionsBySide['Top'][0].y1 - playerCollidable.height;
        }
        else if(collisionsBySide['Bottom']){
            newY = collisionsBySide['Bottom'][0].y1;
        } 
        else {
            newY = playerCollidable.y + moveVector.y;
        }

        if(collisionsBySide['Left']) {
            newX = collisionsBySide['Left'][0].x1 - playerCollidable.width;
        }
        else if(collisionsBySide['Right']){
            newX = collisionsBySide['Right'][0].x1;
        } 
        else {
            newX = playerCollidable.x + moveVector.x;
        }
    } else {
        newX = playerCollidable.x + moveVector.x;
        newY = playerCollidable.y + moveVector.y;
    }

    return {
        x: newX,
        y: newY
    }
}

export const PlayerMoveSystem = 
    on('UpdateAction', (world: World, action: UpdateAction) => {
        const { delta } = action.payload;
        const { player, input, gameEntities } = world;

        const inputVector = vectorFromInput(input);
        const moveVector = scale(inputVector, delta * 0.5);

        if(size(moveVector) == 0){
            return;
        }

        const { x: newX , y: newY } = playerUpdate(player, moveVector, gameEntities)
        
        const playerCollidable = player.getComponent<Collidable>('Collidable')!;
        playerCollidable.x = newX;
        playerCollidable.y = newY;
    }
);
