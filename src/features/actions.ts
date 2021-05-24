import { Action, DoobleActions } from "../dooble/action";

export class NewRaindropAction implements Action {
    readonly type = 'RandomTickAction';

    constructor (public payload: { x: number, y: number }) {}
}

export type Actions = DoobleActions |
    NewRaindropAction;