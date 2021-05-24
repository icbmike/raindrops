import { UpdateAction } from '../../dooble/action';
import { on, Reducer } from '../../dooble/reducer';
import { WorldState } from '../worldstate';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { delta } = action.payload;
        const { rect } = current;
        const { canvas } = current.canvasContext;

        if (rect.leftPos >= canvas.width - 250) {
            return {
                ...current,
                rect: {
                    leftPos: rect.leftPos - 1 * delta,
                    velocity: -1
                }
            };
        }
        else if (rect.leftPos < 150) {
            return {
                ...current,
                rect: {
                    leftPos: rect.leftPos + 1 * delta,
                    velocity: 1
                }
            };
        }

        return {
            ...current,
            rect: {
                ...current.rect,
                leftPos: rect.leftPos + rect.velocity * delta
            }
        };
    }
);
