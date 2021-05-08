import { RectState } from "./rect/rectstate";

export function redraw(context: CanvasRenderingContext2D, state: RectState) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    
    context.fillRect(state.leftPos, 150, 100, 100);
}