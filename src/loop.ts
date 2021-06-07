import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { WorldState } from "./features/worldstate";
import { StartAction, UpdateAction } from "./dooble/action";
import { drawWalls } from "./features/wall/draw";
import { Feature } from "./dooble/feature";

export const loop = (context: CanvasRenderingContext2D, features: Feature[]) => {
    const nonFeatureState = {
        canvasContext: context,
    };
     
    const initialState = Object.assign(nonFeatureState, ...features.map(f => f.initialState))

    const dooble = new Dooble<WorldState>(
        initialState, 
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

        redraw(context, dooble.state, [
            ...features.flatMap(f => f.drawFunctions)
        ]);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}