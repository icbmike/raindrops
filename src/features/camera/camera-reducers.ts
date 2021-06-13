import { UpdateAction } from "../../dooble/action";
import { on } from "../../dooble/reducer";
import { World } from "../worldstate";
import { InputAction } from "../input/input";
import { subtract } from "../../physics/vector";
import { Collidable } from "../../physics/Collidable";

export const cameraZoomReducer = on('InputAction', (world: World, action: InputAction) => {
    const delta = (action.payload.leftSquareBracket ? -0.1 : 0) + (action.payload.rightSquareBracket ? 0.1 : 0);
    
    world.camera = {
        ...world.camera,
        zoom: world.camera.zoom + delta
    };
})

export const cameraUpdateReducer = on('UpdateAction', (world: World, _: UpdateAction) => {
    const { player, camera, canvasContext } = world;

    const playerCollidable = player.getComponent<Collidable>('Collidable')!;
    
    const rectRelativeToCamera = subtract(playerCollidable, camera);
    const screenWidth = canvasContext.canvas.width / camera.zoom;
    const screenHeight = canvasContext.canvas.height / camera.zoom;
    const buffer = 150 / camera.zoom;

    const newX = rectRelativeToCamera.x < buffer
        ? playerCollidable.x - buffer
        : rectRelativeToCamera.x > screenWidth - buffer - playerCollidable.width
            ? playerCollidable.x - (screenWidth - buffer - playerCollidable.width)
            : camera.x;

    const newY = rectRelativeToCamera.y < buffer
        ? playerCollidable.y - buffer
        : rectRelativeToCamera.y > screenHeight - buffer - playerCollidable.height
            ? playerCollidable.y - (screenHeight - buffer - playerCollidable.height)
            : camera.y;

    world.camera = {
        ...camera,
        x: Math.max(0, Math.min(2000, newX)),
        y: Math.max(0, Math.min(1000, newY))
    };
});