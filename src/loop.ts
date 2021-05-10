import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw";
import { createReducer, RectState } from "./features/rectstate";
import { RandomTicks$ } from "./features/random_ticks.story";
import { UpdateAction, StartAction } from "./features/actions";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: RectState = {
        leftPos: 150,
        velocity: 1
    }
    
    const dooble = new Dooble<RectState>(
        initalState, 
        [createReducer(context)], 
        [RandomTicks$]
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