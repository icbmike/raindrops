import { TriggerComponent } from "../trigger/TriggerComponent";
import { Collidable } from "../../physics/Collidable";
import { GameEntity } from "../../dooble/GameEntity";
import { Component } from "../../dooble/Component";
import { DrawComponent } from "../../draw/draw.component";
import { drawDoor } from "./drawDoor";

export class Door extends GameEntity {
    constructor(
        public code: string,
        public state: 'Open' | 'Closed',
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ){
        super([
            new Collidable(x, y, width, height, () => this.state === 'Closed'),
            new TriggerComponent(code, () => this.state = this.state == 'Closed' ? 'Open' : 'Closed'),
            new DrawComponent(drawDoor)
        ]);
    }
    components: Component[];
}
