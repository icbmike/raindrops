import { GameEntity } from "../dooble/GameEntity";
import { World } from "../features/worldstate";
import { Assets } from "./Assets";
import { DrawComponent } from "./draw.component";

export interface DrawFunc<T extends GameEntity> {
    (context: CanvasRenderingContext2D, state: T, assets: Assets) : void;
}

export function redraw(context: CanvasRenderingContext2D, world: World, assets: Assets) {
    // clear the canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    context.scale(world.camera.zoom, world.camera.zoom);
    context.translate(-world.camera.x, -world.camera.y);

    const drawFuncs = [...world.gameEntities, world.player].flatMap(g => {
        const drawComponent = g.getComponent<DrawComponent<GameEntity>>('Draw')
        return drawComponent ? [{df: drawComponent.drawFn, g}] : []
    });

    drawFuncs.forEach(({df, g}) => {
        df(context, g, assets);
    });

    context.resetTransform();
}