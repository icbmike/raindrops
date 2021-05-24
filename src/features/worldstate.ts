import { Raindrop } from "./raindrops/raindrop";
import { RectState } from "./moving-rect/RectState";
import { InputState } from "../input";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[],
    input: InputState,
    canvasContext: CanvasRenderingContext2D 
}
