import { Raindrop } from "./raindrops/raindrop";
import { PlayerState } from "./player/RectState";
import { InputState } from "./input/input";
import { Wall } from "./wall/wall";
import { Camera } from "./camera/Camera";
import { TransporterPair } from "./transporter/Transporter";

export interface WorldState {
    player: PlayerState;
    raindrops: Raindrop[],
    input: InputState,
    walls: Wall[],
    camera: Camera,
    canvasContext: CanvasRenderingContext2D,
    transporters: TransporterPair[]
}
