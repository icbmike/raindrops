import { Player } from "./player/Player";
import { InputState } from "./input/input";
import { Camera } from "./camera/Camera";
import { GameEntity } from "../dooble/GameEntity";
import { Inventory } from "./inventory/inventory.feature";

export interface World {
    player: Player,
    gameEntities: GameEntity[]
    input: InputState,    
    camera: Camera,
    inventory: Inventory,
    canvasContext: CanvasRenderingContext2D,
}
