export interface Action {
    readonly type: string;
}

export class UpdateAction implements Action {
    readonly type = 'UpdateAction';

    constructor (public payload: { delta: number }) {}
}