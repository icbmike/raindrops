import { Component } from "../../dooble/Component";

export class PickupComponent extends Component {
    static Type = 'PickupComponent';
    readonly type = PickupComponent.Type;

    constructor(public value:number) {
        super();
    }
}
