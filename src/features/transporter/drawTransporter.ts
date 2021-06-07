import { DrawFunc } from "../../draw/draw";
import { WorldState } from "../worldstate";

export const drawTransporter: DrawFunc = (context: CanvasRenderingContext2D, state: WorldState) => {
    state.transporters.flatMap(tp => [tp.t1, tp.t2]).forEach(t => {
        context.fillStyle = 'cyan';
        
        context.beginPath();
        context.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        context.fill();
    });
}