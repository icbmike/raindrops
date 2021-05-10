import { Raindrop } from "./raindrop";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[]
}

export interface RectState {
    leftPos: number;
    velocity: number;
}
