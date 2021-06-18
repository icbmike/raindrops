import { Component } from "./Component";

export class PositionComponent extends Component {
    static Type = 'PositionComponent';
    readonly type = PositionComponent.Type;

    constructor(
        public x: number,
        public y:number
    ){
        super();
    }
}