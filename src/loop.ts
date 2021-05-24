import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw";
import { WorldState } from "./features/worldstate";
import { createReducer } from "./features/moving-rect/update.reducer";
import { createRandomTicks } from "./features/randomticks.story";
import { raindropUpdateReducer, raindropTickReducer } from "./features/raindrop";
import { StartAction, UpdateAction } from "./dooble/action";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: WorldState = {
        rect: {
            leftPos: 150,
            velocity: 1
        },
        raindrops: []
    }
     
    const dooble = new Dooble<WorldState>(
        initalState, 
        [createReducer(context), raindropUpdateReducer, raindropTickReducer], 
        [createRandomTicks(context)]
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