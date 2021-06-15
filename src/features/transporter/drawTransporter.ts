import { DrawFunc } from "../../draw/draw";
import { Transporter } from "./Transporter";

export const drawTransporter: DrawFunc<Transporter> = (context: CanvasRenderingContext2D, tGe: Transporter) => { 

    const { x, y, radius, transportProgressPercent } = tGe.transporterComponent;

    const gradient = context.createRadialGradient(x, y, radius, x, y, (transportProgressPercent / 100) * radius);
    
    gradient.addColorStop(0, `green`);
    gradient.addColorStop(1, `cyan`);
    
    context.fillStyle = gradient;
    
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}