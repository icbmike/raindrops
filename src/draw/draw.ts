import { WorldState } from "../features/worldstate";

export interface DrawFunc {
    (context: CanvasRenderingContext2D, state: WorldState) : void;
}

export function redraw(context: CanvasRenderingContext2D, state: WorldState, drawFuncs: DrawFunc[]) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    drawFuncs.forEach(df => {
        df(context, state);
    });
}