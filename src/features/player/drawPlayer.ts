import { Collidable } from "../../physics/Collidable";
import { World } from "../worldstate";
import { Player } from "./Player";

export const drawPlayer = (context: CanvasRenderingContext2D, player: Player) => {
    const { x, y, width, height} = player.getComponent<Collidable>('Collidable')!;
    
    context.fillStyle = 'white';
    context.fillRect(x, y, width, height);
}