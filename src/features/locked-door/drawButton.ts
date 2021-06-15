import { DrawFunc } from "../../draw/draw";
import { Button, InteractiveComponent } from "./Button";

export const drawButton: DrawFunc<Button> = (context: CanvasRenderingContext2D, b: Button) => {
    const ic = b.getComponent<InteractiveComponent>('InteractiveComponent')!;

    const {isInteractive, interactiveArea} = ic;

    if(isInteractive){
        const {x, y, width, height} = interactiveArea;

        const g = context.createRadialGradient(
            x + width / 2, 
            y + height / 2, 
            0, 
            x + width / 2, 
            y + height / 2, 
            20
        )

        g.addColorStop(0, 'rgba(253,216,53,0.5)');
        g.addColorStop(1, 'rgba(0,0,0,1)');
        context.fillStyle = g;
        context.fillRect(x, y, width, height);
    }

    const {on, x, y} = b;
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