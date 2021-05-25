import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { any } from '../../util/any';
import { findIntersection } from '../../util/intersect';
import { WorldState } from '../worldstate';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { up, left, right, down } = current.input;
        const { delta } = action.payload;
        const { rect, walls } = current;
        const { canvas } = current.canvasContext;

        const newX = ((left ? -1 : 0) + (right ? 1 : 0)) * delta + rect.x;
        const newY = ((up ? -1 : 0) + (down ? 1 : 0)) * delta + rect.y;

        const intersection = findIntersection(walls, {
            height: rect.height,
            width: rect.width,
            x: newX,
            y: newY
        });

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
