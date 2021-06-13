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

export const initialWalls: Wall[] = [
    {
        x: 0,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 0,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 800,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 0,
        y: 800,
        height: 10,
        width: 600
    },

    {
        x: 1200,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 1200,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 2000,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 1200,
        y: 800,
        height: 10,
        width: 810
    },
].map(({x, y, width, height}) => new Wall(x, y, width, height));