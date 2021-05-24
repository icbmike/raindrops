export interface Action {
    readonly type: string;
}

export class UpdateAction implements Action {
    readonly type = 'UpdateAction';

    constructor (public payload: { delta: number }) {}
}

export class StartAction implements Action {
    readonly type = 'StartAction';
}

export type DoobleActions = UpdateAction | StartAction;