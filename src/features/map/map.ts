import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Point } from "../../physics/Point";
import { Rect } from "../../physics/Rect";
import { drawMap } from "./drawMap";
import { MapComponent } from "./MapComponent";

export type Area = Point[];

export class Map extends GameEntity {
    constructor(
        bounds: Rect,
        accessibleAreas: Area[]){
        super([
            new DrawComponent(drawMap),
            new MapComponent(bounds, accessibleAreas)
        ]);
    }

    get mapComponent(){
        return this.getComponent<MapComponent>(MapComponent.Type)!;
    }
}
