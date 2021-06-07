import { WorldState } from "../worldstate";

export const drawRect = (context: CanvasRenderingContext2D, state: WorldState) => {
    const { x, y, width, height} = state.player;
    
    context.fillStyle = 'white';
    context.fillRect(x, y, width, height);
}