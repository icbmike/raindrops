import { Raindrop } from "./raindrops/raindrop";
import { RectState } from "./moving-rect/RectState";
import { InputState } from "../input/input";
import { Wall } from "./wall/wall";
import { Camera } from "../draw/camera";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[],
    input: InputState,
    walls: Wall[],
    camera: Camera,
    canvasContext: CanvasRenderingContext2D 
}
