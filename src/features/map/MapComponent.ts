import { Component } from "../../dooble/Component";
import { Rect } from "../../physics/Rect";
import { Area } from "./Map";

export class MapComponent extends Component {
    readonly type = MapComponent.Type;
    static Type = 'MapComponent';

    constructor(
        public bounds: Rect,
        public accessibleAreas: Area[]
    ) {
        super();
    }
}
