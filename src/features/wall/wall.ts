import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Collidable } from "../../physics/Collidable";
import { drawWalls } from "./draw";

export class Wall extends GameEntity {
    constructor(
        x: number,
        y: number,
        width: number,
        height: number){
            super([
                new Collidable(x, y, width, height),
                new DrawComponent<Wall>(drawWalls)
            ]);
        }
}
