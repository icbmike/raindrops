import { DrawFunc } from "../draw/draw";
import { WorldState } from "../features/worldstate";
import { Action } from "./action";
import { Reducer } from "./reducer";
import { Story } from "./story";

export interface Feature {
    reducers: Reducer<WorldState, Action>[],
    stories: Story<WorldState>[],
    drawFunctions: DrawFunc[],
    initialState?: Partial<WorldState>
}