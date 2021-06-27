import { GameEntity } from "../dooble/GameEntity";
import { Component } from "../dooble/Component";
import { DrawFunc } from "./draw";

export class DrawComponent<T extends GameEntity> extends Component{
    readonly type = 'Draw';

    constructor(
        public drawFn: DrawFunc<T>) {
        super();
    }   
}