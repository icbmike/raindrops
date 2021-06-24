import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Point } from "../../physics/Point";
import { drawMap } from "./drawMap";

export type Area = Point[];

export class Map extends GameEntity {
    constructor(
        public width: number,
        public height: number,
        public accessibleAres: Area[]){
        super([
            new DrawComponent(drawMap)
        ]);
    }
}
