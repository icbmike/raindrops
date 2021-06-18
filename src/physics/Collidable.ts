import { GameEntity } from "../dooble/GameEntity";
import { Component } from "../dooble/Component";
import { Rect } from "./Rect";

export class Collidable extends Component implements Rect {
    readonly type = 'Collidable';
    
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public collisionEnabled: () => boolean = () => true,
    ) 
    {
        super();
    }
}
