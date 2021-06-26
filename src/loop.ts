import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { World } from "./features/worldstate";
import { StartAction, UpdateAction } from "./dooble/action";
import { Feature } from "./dooble/Feature";
import { Assets } from "./assets/Assets";

export const loop = (context: CanvasRenderingContext2D, features: Feature[], world: World, assets: Assets) => {
    const dooble = new Dooble<World>(
        world, 
        [
            ...features.flatMap(f => f.systems)
        ], 
        [
            ...features.flatMap(f => f.stories)
        ]
    );

    let lastUpdateTime = 0;
    
    // The loop
    const rafCallback = (now: number) => {
        const delta = (now - lastUpdateTime);
        lastUpdateTime = now;

        dooble.dispatch(new UpdateAction({delta}));

        redraw(context, dooble.state, assets);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}