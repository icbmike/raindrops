import { Component } from "../../dooble/Component";
import { Area } from "./Map";


export class MapComponent extends Component {
    readonly type = MapComponent.Type;
    static Type = 'MapComponent';

    constructor(
        public width: number,
        public height: number,
        public accessibleAreas: Area[]
    ) {
        super();
    }
}
