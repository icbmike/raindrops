import { Trigger } from "../trigger/Trigger";
import { Collidable } from "../../physics/Collidable";

export class Door implements Trigger, Collidable {
    constructor(
        public code: string,
        public state: 'Open' | 'Closed',
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ){}

    collisionEnabled = () => this.state === 'Closed';
}
