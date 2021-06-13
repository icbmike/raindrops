import { Collidable } from "../../physics/Collidable";
import { Rect } from "../../physics/Rect";
import { Component, GameEntity } from "../locked-door/locked-door.feature";

export class Wall implements Rect {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
    ) {}

    collisionEnabled = () => true;
}

class Wall2 implements GameEntity {
    components: Component[];

    constructor(
        x: number,
        y: number,
        width: number,
        height: number){
            this.components = [
                new Collidable(x, y, width, height)
            ]
        }
}

export const initialWalls: Wall[] = [
    {
        x: 0,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 0,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 800,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 0,
        y: 800,
        height: 10,
        width: 600
    },

    {
        x: 1200,
        y: 0,
        width: 10,
        height: 800
    },
    {
        x: 1200,
        y: 0,
        width: 800,
        height: 10
    },
    {
        x: 2000,
        y: 0,
        height: 800,
        width: 10
    },
    {
        x: 1200,
        y: 800,
        height: 10,
        width: 810
    },
].map(({x, y, width, height}) => new Wall(x, y, width, height));