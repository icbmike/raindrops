import { Component } from "../features/locked-door/locked-door.feature";
import { Rect } from "./Rect";

export class Collidable implements Rect, Component {
    readonly type = 'Collidable';
    
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public collisionEnabled: () => boolean = () => true,
    ) 
    {}
}
