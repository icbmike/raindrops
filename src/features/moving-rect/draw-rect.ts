import { WorldState } from "../worldstate";

export const drawRect = (context: CanvasRenderingContext2D, state: WorldState) => {
    context.fillStyle = 'white';
    context.fillRect(state.rect.leftPos, state.rect.topPos, 100, 100);
}