import { Player } from "./player/Player";
import { InputState } from "./input/input";
import { Camera } from "./camera/Camera";
import { GameEntity } from "../dooble/GameEntity";

export interface World {
    player: Player,
    gameEntities: GameEntity[]
    input: InputState,    
    camera: Camera,
    canvasContext: CanvasRenderingContext2D,
}
