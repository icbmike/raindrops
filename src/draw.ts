import { WorldState } from "./features/worldstate";

export function redraw(context: CanvasRenderingContext2D, state: WorldState) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    context.strokeStyle = 'white';
    
    // Rect
    context.fillRect(state.rect.leftPos, 150, 100, 100);

    //Raindrops

    state.raindrops.forEach(rd => {
        context.beginPath();
        context.arc(rd.x, rd.y, rd.radius, 0, Math.PI * 2);
        context.stroke();
    });

}