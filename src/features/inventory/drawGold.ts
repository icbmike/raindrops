import { DrawFunc } from "../../draw/draw";
import { Gold } from "./Gold";

export const drawGold:DrawFunc<Gold> = (context: CanvasRenderingContext2D, gold: Gold) => {
    const { x, y } = gold.position!;

    const gradient = context.createRadialGradient(x, y, 0, x, y, 5);

    gradient.addColorStop(0, '#c4a700');
    gradient.addColorStop(1, '#ffea00');

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
}