import { Raindrop } from "./raindrop";
import { RectState } from "./moving-rect/RectState";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[]
}
