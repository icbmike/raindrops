import { Feature } from "../../dooble/Feature";
import { PlayerMoveSystem } from "./playerUpdate";

export const playerFeature: Feature = {
    systems: [PlayerMoveSystem],
    stories: [],
}