import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Point } from "../../physics/Point";
import { drawMap } from "./drawMap";
import { MapComponent } from "./MapComponent";

export type Area = Point[];

export class Map extends GameEntity {
    constructor(
        width: number,
        height: number,
        accessibleAreas: Area[]){
        super([
            new DrawComponent(drawMap),
            new MapComponent(width, height, accessibleAreas)
        ]);
    }
}
