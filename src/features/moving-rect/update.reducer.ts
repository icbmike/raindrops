import { UpdateAction } from '../../dooble/action';
import { on } from '../../dooble/reducer';
import { WorldState } from '../worldstate';

export const rectReducer = 
    on('UpdateAction', (current: WorldState, action: UpdateAction) => {
        const { up, left, right, down } = current.input;
        const { delta } = action.payload;
        const { rect } = current;
        const { canvas } = current.canvasContext;

        const newLeft =  ((left ? -1 : 0) + (right ? 1 : 0)) * delta;
        const newTop =  ((up ? -1 : 0) + (down ? 1 : 0)) * delta;
        
        return {
            ...current,
            rect: {
                leftPos: Math.max(150, Math.min(canvas.width - 250, rect.leftPos + newLeft)),
                topPos: Math.max(150, Math.min(canvas.height - 250, rect.topPos + newTop))
            }
        };
    }
);
