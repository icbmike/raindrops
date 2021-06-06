import { WorldState } from "../features/worldstate";

export interface DrawFunc {
    (context: CanvasRenderingContext2D, state: WorldState) : void;
}

export function redraw(context: CanvasRenderingContext2D, state: WorldState, drawFuncs: DrawFunc[]) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.scale(state.camera.zoom, state.camera.zoom);
    context.translate(-state.camera.x, -state.camera.y);

    drawFuncs.forEach(df => {
        df(context, state);
    });

    context.resetTransform();
}