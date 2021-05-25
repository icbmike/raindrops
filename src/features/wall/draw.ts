import { WorldState } from "../worldstate";

export const drawWalls = (context: CanvasRenderingContext2D, state: WorldState) => {
    context.fillStyle = 'white';

    state.walls.forEach(wall => {
        context.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}