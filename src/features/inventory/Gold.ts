import { GameEntity } from "../../dooble/GameEntity";
import { PositionComponent } from "../../dooble/PositionComponent";
import { DrawComponent } from "../../draw/DrawComponent";
import { drawGold } from "./drawGold";
import { PickupComponent } from "./PickupComponent";

export class Gold extends GameEntity {
    constructor(
        x: number,
        y: number,
        value: number
    ) {
        super([
            new PositionComponent(x, y),
            new DrawComponent<Gold>(drawGold),
            new PickupComponent(value)
        ]);
    }
}
