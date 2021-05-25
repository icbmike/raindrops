import { Raindrop } from "./raindrops/raindrop";
import { RectState } from "./moving-rect/RectState";
import { InputState } from "../input";
import { Wall } from "./wall/wall";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[],
    input: InputState,
    walls: Wall[],
    canvasContext: CanvasRenderingContext2D 
}
