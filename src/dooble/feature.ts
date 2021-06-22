import { World } from "../features/worldstate";
import { Action } from "./action";
import { Reducer } from "./reducer";
import { Story } from "./story";

export interface Feature {
    reducers: Reducer<World, Action>[],
    stories: Story<World>[]
}