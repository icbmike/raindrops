import { Dooble } from "./dooble/dooble";
import { redraw } from "./draw/draw";
import { WorldState } from "./features/worldstate";
import { createRandomTicks } from "./features/randomticks.story";
import { raindropUpdateReducer, raindropTickReducer } from "./features/raindrops/raindrop";
import { StartAction, UpdateAction } from "./dooble/action";
import { rectReducer } from "./features/moving-rect/update.reducer";
import { drawRect } from "./features/moving-rect/draw-rect";
import { drawRaindrops } from "./features/raindrops/draw";
import { drawFPS } from "./draw/draw-fps";
import { inputReducer, inputStory } from "./input";

export const loop = (context: CanvasRenderingContext2D) => {
    const initalState: WorldState = {
        rect: {
            leftPos: 150,
            topPos: 150
        },
        raindrops: [],
        canvasContext: context,
        input: {
            down: false,
            left: false,
            right: false,
            up: false
        }
    }
     
    const dooble = new Dooble<WorldState>(
        initalState, 
        [
            rectReducer, 
            raindropUpdateReducer, 
            raindropTickReducer,
            inputReducer
        ], 
        [
            createRandomTicks(context),
            inputStory
        ]
    );

    let lastUpdateTime = 0;
    
    // The loop
    const rafCallback = (now: number) => {
        const delta = (now - lastUpdateTime);
        lastUpdateTime = now;

        dooble.dispatch(new UpdateAction({delta}));

        redraw(context, dooble.state, [
            drawRect,
            drawRaindrops,
            drawFPS
        ]);

        window.requestAnimationFrame(rafCallback);
    };

    // Start
    dooble.dispatch(new StartAction());
    window.requestAnimationFrame(rafCallback);
}