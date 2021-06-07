import { Raindrop } from "./raindrops/raindrop";
import { RectState } from "./player/RectState";
import { InputState } from "./input/input";
import { Wall } from "./wall/wall";
import { Camera } from "./camera/Camera";

export interface WorldState {
    rect: RectState;
    raindrops: Raindrop[],
    input: InputState,
    walls: Wall[],
    camera: Camera,
    canvasContext: CanvasRenderingContext2D 
}
