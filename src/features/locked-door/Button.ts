import { GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { TriggerComponent } from "../trigger/TriggerComponent";
import { TriggerSourceComponent } from "../trigger/TriggerSourceComponent";
import { drawButton } from "./drawButton";
import { InteractiveComponent } from "../trigger/InteractiveComponent";

export class Button extends GameEntity {
    constructor(
        emitCode: string,
        public x: number,
        public y: number,
        public on: boolean
    ){
        super([
            new TriggerSourceComponent(emitCode),
            new TriggerComponent(emitCode, () => this.on = !this.on),
            new InteractiveComponent({x: x - 20, y: y - 20, width: 55, height: 70}),
            new DrawComponent<Button>(drawButton)
        ])
    }
}

