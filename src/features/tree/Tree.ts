import { GameEntity } from "../../dooble/GameEntity";
import { DrawSpriteComponent } from "../../draw/DrawSprite";
import { Collidable } from "../../physics/Collidable";

export class Tree extends GameEntity {
    constructor(
        x: number,
        y: number,
        spriteName: 'tree_light' | 'tree_dark' | 'tree_orange'
    ) {
        super([
            new Collidable(x, y, 64, 64),
            new DrawSpriteComponent(spriteName, x, y)
        ]);
    }
}