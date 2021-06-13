import { DrawFunc } from "../../draw/draw";
import { World } from "../worldstate";
import { Button } from "./Button";

export const drawButton: DrawFunc<Button> = (context: CanvasRenderingContext2D, b: Button) => {
    const {x, y, on, interactive} = b;

    if(interactive){
        const g = context.createRadialGradient(x + 7.5, y + 15, 0, x + 7.5, y + 15, 20)

        g.addColorStop(0, 'rgba(253,216,53,0.5)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = g;
        context.fillRect(x - 10, y - 10, 35, 50);
    }

    context.fillStyle = 'gray';
    context.fillRect(x, y, 15, 30);

    context.fillStyle = on ? '#440000' : '#cc0000';
    context.beginPath();
    context.arc(x + 8, y + 8, 5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = on ? '#00cc00' : '#004400';
    context.beginPath();
    context.arc(x + 8, y + 20, 5, 0, Math.PI * 2);
    context.fill();
}