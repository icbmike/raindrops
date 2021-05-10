import { StartAction, UpdateAction } from "./action";
import { Dooble, OneSecondStory } from "./dooble";
import { redraw } from "./draw";
import { createReducer, RectState } from "./rect/rectstate";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: RectState = {
        leftPos: 150,
        velocity: 1
    }
    
    const dooble = new Dooble<RectState>(
        initalState, 
        [createReducer(context)], 
        [new OneSecondStory()]
    );

    let lastUpdateTime = 0;
    // The loop
    const rafCallback = (now: number) => {
        const delta = now - lastUpdateTime;
        lastUpdateTime = now;

        dooble.dispatch(new UpdateAction({delta}));

        redraw(context, dooble.state);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}