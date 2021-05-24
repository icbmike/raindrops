import { WorldState } from "../worldstate";

export const drawRaindrops = (context: CanvasRenderingContext2D, state: WorldState) => {
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
}