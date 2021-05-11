import { WorldState } from "./features/worldstate";

export function redraw(context: CanvasRenderingContext2D, state: WorldState) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'white';
    
    // Rect
    context.fillRect(state.rect.leftPos, 150, 100, 100);

    //Raindrops

    state.raindrops.forEach(rd => {
        const numLayers = 30
        
        Array.from({length: numLayers}, (x, i) => i).forEach(i => {
            const a = i / numLayers;
            context.strokeStyle = `rgba(${rd.r}, ${rd.g}, ${rd.b}, ${a})`;

            context.beginPath();
            context.arc(rd.x, rd.y, rd.radius + i, 0, Math.PI * 2);
            context.stroke();
        })
    });
}