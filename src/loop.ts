import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { World } from "./features/worldstate";
import { StartAction, UpdateAction } from "./dooble/action";
import { Feature } from "./dooble/feature";

export const loop = (context: CanvasRenderingContext2D, features: Feature[]) => {
    const initialState = {
        canvasContext: context,
        gameEntities: features.flatMap(f => f.gameEntities),
        camera: {
            x: 0,
            y: 0,
            zoom: 1
        },
        player: {
            x: 150,
            y: 150,
            height: 25,
            width: 25
        }
    };

    const dooble = new Dooble<World>(
        initialState as any, 
        [
            ...features.flatMap(f => f.reducers)
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

        redraw(context, dooble.state);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}