import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/DrawComponent";
import { LineWithNormal } from "../../physics/Line";
import { Rect } from "../../physics/Rect";
import { drawMap } from "./drawMap";
import { MapComponent } from "./MapComponent";

export type Area = LineWithNormal[];

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
