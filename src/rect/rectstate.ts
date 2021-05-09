import { Reducer } from '../reducer';
import { UpdateAction } from '../action';

export interface RectState {
    leftPos: number;
    velocity: number;
}

export const createReducer = (cvs: CanvasRenderingContext2D): Reducer<RectState, UpdateAction> => {
    return (current: RectState, action: UpdateAction): RectState => {
        const { delta } = action.payload;

        if (current.leftPos >= cvs.canvas.width - 250) {
            return {
                leftPos: current.leftPos - 1 * delta,
                velocity: -1
            }
        }
        else if (current.leftPos < 150) {
            return {
                leftPos: current.leftPos + 1 * delta,
                velocity: 1
            };
        }

        return {
            ...current,
            leftPos: current.leftPos + current.velocity * delta
        }
    };
}