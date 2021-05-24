import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { WorldState } from "./features/worldstate";
import { createRandomTicks } from "./features/randomticks.story";
import { raindropUpdateReducer, raindropTickReducer } from "./features/raindrops/raindrop";
import { StartAction, UpdateAction } from "./dooble/action";
import { rectReducer } from "./features/moving-rect/update.reducer";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: WorldState = {
        rect: {
            leftPos: 150,
            velocity: 1
        },
        raindrops: [],
        canvasContext: context
    }
     
    const dooble = new Dooble<WorldState>(
        initalState, 
        [
            rectReducer, 
            raindropUpdateReducer, 
            raindropTickReducer
        ], 
        [
            createRandomTicks(context)
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