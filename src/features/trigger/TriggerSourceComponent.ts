import { Component } from "../../dooble/Component";

export class TriggerSourceComponent extends Component {
    static Type = 'TriggerSourceComponent';
    readonly type = TriggerSourceComponent.Type;

    constructor(
        public code: string
    ) {
        super();
    }
}
