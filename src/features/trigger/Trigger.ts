import { Action } from "../../dooble/action";

export interface Trigger {
    code: string;
}

export interface TriggerSource {
    emitCode: string;
}

export class TriggerAction implements Action {
    readonly type = 'TriggerAction';

    constructor(private payload: { code:string }){}
}