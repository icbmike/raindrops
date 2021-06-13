import { TriggerComponent } from "../trigger/Trigger";
import { Collidable } from "../../physics/Collidable";
import { Component, GameEntity } from "../../dooble/GameEntity";

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
            new TriggerComponent(code, () => this.state = this.state == 'Closed' ? 'Open' : 'Closed')
        ]);
    }
    components: Component[];
}
