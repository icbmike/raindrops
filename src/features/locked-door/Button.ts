import { Component, GameEntity } from "../../dooble/GameEntity";
import { DrawComponent } from "../../draw/draw.component";
import { Rect } from "../../physics/Rect";
import { TriggerSourceComponent } from "../trigger/Trigger";
import { drawButton } from "./drawButton";

export class Button extends GameEntity {
    constructor(
        emitCode: string,
        public x: number,
        public y: number,
        public on: boolean
    ){
        super([
            new TriggerSourceComponent(emitCode),
            new InteractiveComponent({x: x - 20, y: y - 20, width: 55, height: 70}),
            new DrawComponent<Button>(drawButton)
        ])
    }
}


export class InteractiveComponent extends Component {
    readonly type = 'InteractiveComponent';

    public isInteractive = false;

    constructor(
        public interactiveArea: Rect
    ) {
        super();
    }
}