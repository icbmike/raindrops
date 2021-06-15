import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { TriggerSourceComponent } from "../trigger/Trigger";
import { drawButton } from "./drawButton";

export class Button extends GameEntity {
    constructor(
        public emitCode: string,
        public x: number,
        public y: number,
        public on: boolean,
        public interactive: boolean
    ){
        super([
            new TriggerSourceComponent(emitCode),
            new DrawComponent<Button>(drawButton)
        ])
    }
}
