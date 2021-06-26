import { on } from "../../dooble/system";
import { InputAction } from "../input/input";
import { World } from "../worldstate";

export const cameraZoomSystem  = on('InputAction', (world: World, action: InputAction) => {
    const delta = (action.payload.leftSquareBracket ? -0.1 : 0) + (action.payload.rightSquareBracket ? 0.1 : 0);
    
    world.camera = {
        ...world.camera,
        zoom: world.camera.zoom + delta
    };
})