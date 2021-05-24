import { Raindrop } from "./raindrops/raindrop";
import { RectState } from "./moving-rect/RectState";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[]
    canvasContext: CanvasRenderingContext2D 
}
