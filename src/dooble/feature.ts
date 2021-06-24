import { World } from "../features/worldstate";
import { Action } from "./action";
import { System } from "./system";
import { Story } from "./story";

export interface Feature {
    systems: System<World, Action>[],
    stories: Story<World>[]
}