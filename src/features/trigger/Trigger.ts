import { Action } from "../../dooble/action";
import { Component } from "../../dooble/GameEntity";

export interface Trigger {
    code: string;
}

export interface TriggerSource {
    emitCode: string;
}

export class TriggerAction implements Action {
    readonly type = 'TriggerAction';

    constructor(public payload: { code: string }){}
}

export class TriggerComponent extends Component {
    readonly type = 'Trigger';

    constructor(
        public code: string,
        public fn: () => void
    ) {
        super();
    }
}

export class TriggerSourceComponent extends Component {
    readonly type = 'TriggerSource';

    constructor(
        public code: string
    ){
        super()
    }
}