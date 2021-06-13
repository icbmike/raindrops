import { World } from "../worldstate";

export const drawRect = (context: CanvasRenderingContext2D, state: World) => {
    const { x, y, width, height} = state.player;
    
    context.fillStyle = 'white';
    context.fillRect(x, y, width, height);
}