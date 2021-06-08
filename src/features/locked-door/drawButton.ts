import { DrawFunc } from "../../draw/draw";
import { WorldState } from "../worldstate";

export const drawButton: DrawFunc = (context: CanvasRenderingContext2D, state: WorldState) => {
    state.buttons.forEach(b => {
        const {x, y, state} = b;
        context.fillStyle = 'gray';
        context.fillRect(x, y, 15, 30);

        context.fillStyle = state ? '#440000' : '#cc0000';
        context.beginPath();
        context.arc(x + 8, y + 8, 5, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = state ? '#00cc00' : '#004400';
        context.beginPath();
        context.arc(x + 8, y + 20, 5, 0, Math.PI * 2);
        context.fill();
    });
}