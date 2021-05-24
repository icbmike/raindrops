import { WorldState } from "../worldstate";

export const drawRect = (context: CanvasRenderingContext2D, state: WorldState) => {
    context.fillStyle = 'white';
    context.fillRect(state.rect.leftPos, 150, 100, 100);
}