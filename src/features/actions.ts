import { Action } from "../dooble/action";

export class UpdateAction implements Action {
    readonly type = 'UpdateAction';

    constructor (public payload: { delta: number }) {}
}

export class StartAction implements Action {
    readonly type = 'StartAction';
}

export class NewRaindropAction implements Action {
    readonly type = 'RandomTickAction';

    constructor (public payload: { x: number, y: number }) {}
}

export type Actions = 
    UpdateAction |
    StartAction |
    NewRaindropAction;