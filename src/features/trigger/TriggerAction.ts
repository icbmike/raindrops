import { Action } from "../../dooble/action";


export class TriggerAction implements Action {
    readonly type = 'TriggerAction';

    constructor(public payload: { code: string; }) { }
}
