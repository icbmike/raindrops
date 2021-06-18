import { Component } from "../../dooble/GameEntity";


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
