import { DrawFunc } from "../draw/draw";
import { World } from "../features/worldstate";
import { Action } from "./action";
import { GameEntity } from "./GameEntity";
import { Reducer } from "./reducer";
import { Story } from "./story";

export interface Feature {
    reducers: Reducer<World, Action>[],
    stories: Story<World>[],
    gameEntities: GameEntity[]
}