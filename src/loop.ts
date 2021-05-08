import { redraw } from "./draw";
import { createReducer, RectState } from "./rect/rectstate";

export const loop = (context: CanvasRenderingContext2D) => {
    // Create initial state
    let lastUpdateTime = 0;
    
    const initalState: RectState = {
        leftPos: 150,
        velocity: 1
    }
    
    let currentState = initalState;
    
    const rectStateReducer = createReducer(context);

    // The loop
    const rafCallback = (now: number) => {
        const delta = now - lastUpdateTime;
        lastUpdateTime = now;

        currentState = rectStateReducer(currentState, delta);

        redraw(context, currentState);
        window.requestAnimationFrame(rafCallback);
    };

    // Start
    window.requestAnimationFrame(rafCallback);
}