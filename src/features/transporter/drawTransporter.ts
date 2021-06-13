import { DrawFunc } from "../../draw/draw";
import { World } from "../worldstate";
import { TransporterPair } from "./Transporter";

export const drawTransporter: DrawFunc<TransporterPair> = (context: CanvasRenderingContext2D, tp: TransporterPair) => {
    [tp.t1, tp.t2].forEach(t => {
        
        const gradient = context.createRadialGradient(t.x, t.y, t.radius, t.x, t.y, (t.transportProgressPercent / 100) * t.radius);
        
        gradient.addColorStop(0, `green`);
        gradient.addColorStop(1, `cyan`);
        
        context.fillStyle = gradient;
        
        context.beginPath();
        context.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        context.fill();
    });
}