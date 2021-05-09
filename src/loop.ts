import { UpdateAction } from "./action";
import { Dooble } from "./dooble";
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
        []
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
    window.requestAnimationFrame(rafCallback);
}