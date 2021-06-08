import { TriggerSource } from "../trigger/Trigger";

export interface Button extends TriggerSource {
    x: number;
    y: number;
    on: boolean;
    interactive: boolean;
}
