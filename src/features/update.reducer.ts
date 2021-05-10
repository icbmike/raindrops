import { on, Reducer } from '../dooble/reducer';
import { Actions, UpdateAction } from './actions';
import { WorldState } from './worldstate';

export function createReducer(cvs: CanvasRenderingContext2D): Reducer<WorldState, Actions> {
    return on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { delta } = action.payload;
        const { rect } = current;

        if (rect.leftPos >= cvs.canvas.width - 250) {
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
}
