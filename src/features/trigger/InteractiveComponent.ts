import { Component } from "../../dooble/GameEntity";
import { Rect } from "../../physics/Rect";

export class InteractiveComponent extends Component {
    static Type = 'InteractiveComponent';
    readonly type = InteractiveComponent.Type;

    public isInteractive = false;

    constructor(
        public interactiveArea: Rect
    ) {
        super();
    }
}
