import { WorldState } from "./features/worldstate";

let lastFrame = Date.now();
export function redraw(context: CanvasRenderingContext2D, state: WorldState) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    // Rect
    context.fillStyle = 'white';
    context.fillRect(state.rect.leftPos, 150, 100, 100);

    //Raindrops
    state.raindrops.forEach(rd => {
        const gradient = context.createRadialGradient(rd.x, rd.y, rd.radius, rd.x, rd.y, rd.radius + 30);

        gradient.addColorStop(0, `rgba(${rd.r}, ${rd.g}, ${rd.b}, 0)`);
        gradient.addColorStop(1, `rgba(${rd.r}, ${rd.g}, ${rd.b}, 1)`);
        
        context.fillStyle = gradient;
        context.beginPath();

        context.moveTo(rd.x + rd.radius, rd.y)
        context.lineTo(rd.x + rd.radius + 30, rd.y)
        context.arc(rd.x, rd.y, rd.radius + 30, 0, Math.PI * 2, false);
        
        context.lineTo(rd.x + rd.radius, rd.y);
        context.arc(rd.x, rd.y, rd.radius, 0, Math.PI * 2, true);

        context.fill();
    });

    // FPS
    const now = Date.now();
    const deltaSeconds = (now - lastFrame) / 1000;
    lastFrame = now;
    const fps = 1 / deltaSeconds;
    context.textBaseline = "top";

    context.fillStyle = 'white';
    context.fillText(`FPS: ${fps.toPrecision(4)}`, 10, 10);
}