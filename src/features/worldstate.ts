import { Raindrop } from "./raindrops/raindrop";
import { PlayerState } from "./player/RectState";
import { InputState } from "./input/input";
import { Wall } from "./wall/wall";
import { Camera } from "./camera/Camera";
import { TransporterPair } from "./transporter/Transporter";
import { Button } from "./locked-door/Button";
import { Door } from "./locked-door/Door";

export interface WorldState {
    player: PlayerState;
    raindrops: Raindrop[],
    input: InputState,
    walls: Wall[],
    camera: Camera,
    canvasContext: CanvasRenderingContext2D,
    transporters: TransporterPair[],
    doors: Door[],
    buttons: Button[]
}
