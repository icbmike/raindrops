import { GameEntity } from "../../dooble/GameEntity";
import { TriggerSource } from "../trigger/Trigger";

export class Button extends GameEntity implements TriggerSource {
    emitCode: string;
    x: number;
    y: number;
    on: boolean;
    interactive: boolean;
}
