import { Trigger } from "../trigger/Trigger";

export interface Door extends Trigger {
    state: 'Open' | 'Closed' | 'Opening' | 'Closing';
    x: number;
    y: number;
    width: number;
    height: number;
}
