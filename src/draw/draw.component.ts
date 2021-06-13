import { Component, GameEntity } from "../dooble/GameEntity";
import { DrawFunc } from "./draw";

export class DrawComponent<T extends GameEntity> extends Component{
    readonly type = 'Draw';

    constructor(
        public drawFn: DrawFunc<T>) {
        super();
    }   
}