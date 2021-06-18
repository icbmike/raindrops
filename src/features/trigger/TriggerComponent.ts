import { Component } from "../../dooble/Component";

export class TriggerComponent extends Component {
    readonly type = TriggerComponent.Type;
    static Type = 'TriggerComponent';

    constructor(
        public code: string,
        public fn: () => void
    ) {
        super();
    }
}
