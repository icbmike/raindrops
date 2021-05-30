import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { inputReducer, InputState } from '../../input';
import { any } from '../../util/any';
import { findIntersection } from '../../util/intersect';
import { Down, fromAngleAndSize, Left, Right, scale, Up, Vector, Zero } from '../../util/vector';
import { WorldState } from '../worldstate';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { delta } = action.payload;
        const { rect, walls } = current;
        const { canvas } = current.canvasContext;

        const inputVector = vectorFromInput(current.input);
        const moveVector = scale(inputVector, delta);

        const intersection = findIntersection(walls, rect, moveVector);

        const newX = rect.x + moveVector.x;
        const newY = rect.y + moveVector.y;

        if(intersection) {
            switch(intersection.side) {
                case 'Top':
                    return {
                        ...current,
                        rect: {
                            ...rect,
                            x: Math.max(0, Math.min(canvas.width - rect.width, newX)),
                            y: intersection.y1 - rect.height
                        }
                    };
                case 'Bottom':
                    return {
                        ...current,
                        rect: {
                            ...rect,
                            x: Math.max(0, Math.min(canvas.width - rect.width, newX)),
                            y: intersection.y1
                        }
                    };
                case 'Left':
                    return {
                        ...current,
                        rect: {
                            ...rect,
                            x: intersection.x1 - rect.width,
                            y: Math.max(0, Math.min(canvas.height - rect.height, newY))
                        }
                    };
                case 'Right':
                    return {
                        ...current,
                        rect: {
                            ...rect,
                            x: intersection.x1,
                            y: Math.max(0, Math.min(canvas.height - rect.height, newY))
                        }
                    };
            }
        } else {
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


const vectorFromInput = (input: InputState) : Vector => {
    const { up, down, left, right } = input;

    // Zero
    if(
            (up && down && left && right)
         || (!up && !down && left && right)
         || (!up && !down && !left && !right)
         || (up && down && !left && !right)
    ) {
        return Zero;
    }

    // Up
    if(
            (up && !down && left && right)
        || (up && !down && !left && !right)
     ) {
        return Up;
    }

    // Down
    if(
           (!up && down && left && right)
        || (!up && down && !left && !right)
     ) {
        return Down;
     }

     // Left
    if(
        (up && down && left && !right)
        || (!up && !down && left && !right)
    ) {
        return Left;
    }

    // Right
    if(
        (up && down && !left && right)
        || (!up && !down && !left && right)
    ) {
        return Right;
    }

    // Diagonals
    if(up && right){
        return fromAngleAndSize(Math.PI / 4, 1);
    }

    if(up && left){
        return fromAngleAndSize(Math.PI / 4 * 3, 1);
    }
    
    if(down && left) {
        return fromAngleAndSize(Math.PI / 4 * 5, 1);
    }

    if(down && right) {
        return fromAngleAndSize(Math.PI / 4 * 7, 1);
    }
}

