import { Raindrop } from "./raindrops/raindrop";
import { PlayerState } from "./player/RectState";
import { InputState } from "./input/input";
import { Wall } from "./wall/wall";
import { Camera } from "./camera/Camera";
import { TransporterPair } from "./transporter/Transporter";
import { Button } from "./locked-door/Button";
import { GameEntity } from "../dooble/GameEntity";

export interface World {
    player: PlayerState;
    gameEntities: GameEntity[]
    raindrops: Raindrop[],
    input: InputState,    
    camera: Camera,
    canvasContext: CanvasRenderingContext2D,
    transporters: TransporterPair[],
    buttons: Button[]
}
