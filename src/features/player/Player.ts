import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Collidable } from "../../physics/Collidable";
import { drawPlayer } from "./drawPlayer";

export class Player extends GameEntity {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number
    ){
        super([
            new Collidable(x, y, width, height, () => true),
            new DrawComponent<Player>(drawPlayer)
        ]);
    }
}
