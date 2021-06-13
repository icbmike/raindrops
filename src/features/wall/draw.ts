import { Collidable } from "../../physics/Collidable";
import { Wall } from "./wall";

export const drawWalls = (context: CanvasRenderingContext2D, wall: Wall) => {
    context.fillStyle = 'white';
    
    const {x, y, width, height} = wall.getComponent<Collidable>('Collidable')!

    context.fillRect(x, y, width, height);
}