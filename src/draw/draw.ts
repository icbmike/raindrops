import { GameEntity } from "../dooble/GameEntity";
import { World } from "../features/worldstate";
import { DrawComponent } from "./draw.component";

export interface DrawFunc<T extends GameEntity> {
    (context: CanvasRenderingContext2D, state: T) : void;
}

export function redraw(context: CanvasRenderingContext2D, state: World) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.scale(state.camera.zoom, state.camera.zoom);
    context.translate(-state.camera.x, -state.camera.y);

    const drawFuncs = state.gameEntities.flatMap(g => {
        const drawComponent = g.getComponent<DrawComponent<GameEntity>>('Draw')
        return drawComponent ? [{df: drawComponent.drawFn, g}] : []
    });

    drawFuncs.forEach(({df, g}) => {
        df(context, g);
    });

    context.resetTransform();
}