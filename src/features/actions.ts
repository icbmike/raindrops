import { Action } from "../dooble/action";

export class UpdateAction implements Action {
    readonly type = 'UpdateAction';

    constructor (public payload: { delta: number }) {}
}

export class StartAction implements Action {
    readonly type = 'StartAction';
}

export class RandomTickAction implements Action {
    readonly type = 'RandomTickAction';
}

export type Actions = 
    UpdateAction |
    StartAction |
    RandomTickAction;