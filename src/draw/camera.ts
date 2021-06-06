import { UpdateAction } from "../dooble/action";
import { on } from "../dooble/reducer";
import { WorldState } from "../features/worldstate";
import { InputAction } from "../input/input";
import { subtract } from "../physics/vector";

export interface Camera {
    x: number;
    y: number;
    zoom: number;
}

export const cameraZoomReducer = on('InputAction', (current: WorldState, action: InputAction) => {
    const delta = (action.payload.leftSquareBracket ? -0.1 : 0) + (action.payload.rightSquareBracket ? 0.1 : 0);
    
    return {
        ...current,
        camera: {
            ...current.camera,
            zoom: current.camera.zoom + delta
        }
    }
})

export const cameraUpdateReducer = on('UpdateAction', (current: WorldState, _: UpdateAction) => {
    const {rect, camera, canvasContext} = current;

    const rectRelativeToCamera = subtract(rect, camera);
    const screenWidth = canvasContext.canvas.width / camera.zoom;
    const screenHeight = canvasContext.canvas.height / camera.zoom;
    const buffer = 150 / camera.zoom;

    const newX = rectRelativeToCamera.x < buffer
        ? rect.x - buffer
        : rectRelativeToCamera.x > screenWidth - buffer - rect.width
            ? rect.x - (screenWidth - buffer - rect.width)
            : camera.x;

    const newY = rectRelativeToCamera.y < buffer
        ? rect.y - buffer
        : rectRelativeToCamera.y > screenHeight - buffer - rect.height
            ? rect.y - (screenHeight - buffer - rect.height)
            : camera.y;

    return {
        ...current,
        camera: {
            ...camera,
            x: Math.max(0, Math.min(2000, newX)),
            y: Math.max(0, Math.min(1000, newY))
        }
    }
});